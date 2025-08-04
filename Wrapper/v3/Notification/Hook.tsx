import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNotify } from "../../../../contexts/NotifyContext";
import { NotificationType } from "../../../../shared-types/notification.type";
import { handleRegexUrl } from "../../../../shared-types/utils/routes";
import { getNotifications, markAsViewed } from "../../../services/notification";
import notificationSound from "../../../assets/notification.mp3"

const alertNotification = new Audio(notificationSound)

export const useNotifications = () => {
  const { toast, showMessage } = useNotify();
  const { user } = useAuth();

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<NotificationType[]>();
  const [lastNotificationId, setLastNotificationId] = useState<string>();
  const [unvieweds, setUnviewed] = useState<number>(0);

  useEffect(() => {
    if(!user) return;
    loadNotifications(undefined, true)
  },[user])

  useEffect(() => {
    if(!user) return;

    const delay = 30 * 1000
    const refreshNotifications = setInterval(() => loadNotifications(
      lastNotificationId
    ), delay)

    return () => {
      if(refreshNotifications) clearInterval(refreshNotifications)
    }

  },[user, lastNotificationId])

  async function loadNotifications(last_notification_id?: string, reset = false){
    if(!user) return;

    const res = await getNotifications({
      token: user.token,
      last_notification_id
    })

    if(!res.result){
      if(reset) toast.error(res.response)
      else console.error(res.response)
    }
    if(!res.data) return;
    
    if(res.data.datas.length > 0){
      setLastNotificationId(res.data.datas[0].id)
      if(!reset){
        try{
          alertNotification.play();

          const currentPageTitle = document.title
          document.title = res.data.datas.length === 1 ? `(1) nova notificação` : `(${res.data.datas.length}) novas notificações`
          setTimeout(() => document.title = currentPageTitle, 5 * 1000)
        }catch(e){}
      }
    }

    setNotifications((prevState) => {
      if(reset) return res.data!.datas
    
      const newNotificationIds = res.data!.datas.map((d) => d.id)
      const newState = [
        ...res.data!.datas,
        ...(prevState ?? []).filter(state => !newNotificationIds.includes(state.id))
      ]

      return newState
    })

    if(res.data.total > - 1) setUnviewed(res.data.total)
  }
  function handleGoToAllNotificactions(){
    const url = handleRegexUrl('@hub:notification.all', user?.token)
    if(url.slice(0,4) === 'http') window.location.href = url
    else navigate(url)
  }
  function onDetails(notification: NotificationType){
    handleMarkAsViewed(notification.id, true)
    showMessage((
      <div>
        <p className="text-gray-500">{notification.description}</p>
      </div>
    ),{
      title: notification.title,
      cancelButtonText: 'Voltar',
      ...(notification.redirect_to ? {
        actionButton: {
          onClick: () => {
            const url = handleRegexUrl(notification.redirect_to! as any, user?.token)
            if(url.slice(0,4) === 'http') window.location.href = url
            else navigate(url)
          },
          theme: 'primary',
          text: 'Acessar'
        }
      }:{})
    })
  }
  async function handleMarkAsViewed(id: string, ignoreToast = false){
    if(!user) return;
    
    const res = await markAsViewed([id], user.token)
    
    if(!res.result){
      if(!ignoreToast) toast.error(res.response);
      return;
    }

    setNotifications((prevState) => (prevState ?? []).filter((state) => state.id !== id))
    setUnviewed((prevState) => prevState - 1)
  }

  return {
    unvieweds,
    notifications,
    onDetails,
    handleMarkAsViewed,
    handleGoToAllNotificactions
  }
}