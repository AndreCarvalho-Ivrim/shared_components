import { useEffect, useState } from "react";
import { Dropdown } from "../../../utils/Dropdown"
import { NotificationIcon } from "../../../utils/icons"
import { useAuth } from "../../../../contexts/AuthContext";
import { shortclass } from "../../../../styles/styles";
import { useNotify } from "../../../../contexts/NotifyContext";
import { getNotifications } from "../../../services/notification";
import { NotificationType } from "../../../../shared-types/notification.type";
import { handleRegexUrl } from "../../../../shared-types/utils/routes";
import { useNavigate } from "react-router-dom";
import { NotificationIconOrDefaultByType } from "./NotificationIconOrDefaultByType";

export const BellNotification = () => {
  const { toast } = useNotify();
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

    const delay = 15 * 1000
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
    
    if(res.data.datas.length > 0) setLastNotificationId(res.data.datas[0].id)

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
    const url = handleRegexUrl('@hub:notification.all')
    if(url.slice(0,4) === 'http') window.location.href = url
    else navigate(url)
  }

  // [ ] QUANDO CLICAR NA NOTIFICAÇÃO DEVE ABRIR A NOTIFICAÇÃO EM UM MODAL PARA VE-LA COMPLETA
  //     [ ] AO ABRIR DEVE MARCAR A NOTIFICAÇÃO COMO VISUALIZADA
  //     [ ] COLOCAR UM SETTIMEOUT DE 5 SEGUNDOS PARA REMOVER A NOTIFICAÇÃO DA TELA APÓS VISUALIZADA
  //     [ ] DEVE TER ALGUM BOTÃO DE REDIRECIONAMENTO PARA AÇÃO
  //     [ ] CASO TENHA TEMPLATE DO TIPO PLATAFORMA DEVE TER ALGUM LINK PARA ABRIR EM OUTRA PÁGINA
  // [ ] QUANDO FAZER O HOVER ENCIMA DO ITEM, DEVE REVELAR UM BOTÃO POR CIMA NA LATERAL DIREITA, PARA MARCAR COMO VISUALIZADO
  // [ ] O BOTÃO VER TODAS DEVE REDIRECIONAR PARA A TELA DE NOTIFICAÇÃO
  // [x] LIDAR COM CASH
  // [x] LIDAR COM LAST NOTIFICATION E ATUALIZAÇÃO DE NOTIFICAÇÕES
  // [ ] DISPARAR ALERTA SONORO QUANDO CHEGAR NOVAS NOTIFICAÇÕES.
  // [ ] BACKEND
  //     [ ] A RESPOSTA E O CACHE DEVEM CONTER A QUANTIDADE DE NOTIFICAÇÕES NÃO VISUALIZADAS
  //     [ ] QUANDO CADASTRAR NOVAS NOTIFICAÇÕES ISSO DEVE AFETAR A QUANTIDADE DE NÃO NOTIFICADAS
  
  return (
    <Dropdown
      trigger={
        <div className="relative mt-0.5 -mb-0.5">
          <NotificationIcon className="text-primary-800 max-sm:hidden"/>
          {unvieweds > 0 && (
            <span className="
              absolute top-1 right-1 bg-primary-800 text-white text-[10px] rounded-full
              w-4 h-4 translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center
            ">
              {unvieweds > 9 ? '+9' : unvieweds}
            </span>
          )}
        </div>
      }
    >
      <div className="max-h-[20rem] overflow-y-auto">
        <div className="flex flex-col gap-1">
          {notifications ? (
            <>
              {notifications.length > 0 ? notifications.map((notification) => (
                <button
                  type="button"
                  className={`
                    ${shortclass.dropdownItem}
                    !flex flex-col
                    !text-primary-900
                  `}
                  key={notification.id}
                >
                  
                  <div className="flex items-center gap-2 max-w-full">
                    <NotificationIconOrDefaultByType notification={notification} props={{ w: 18, h: 18 }}/>
                    <strong className="text-sm max-w-[calc(100%-2rem)] truncate">{notification.title}</strong>
                  </div>
                  <span className="text-gray-400 text-xs font-normal">
                    {notification.description.slice(0, 80) + (notification.description.length > 80 ? '...':'')}
                  </span>
                </button>
              )):(
                <p className="text-xs text-center text-gray-400 py-6 px-2 bg-gray-50 mb-1 rounded-sm">
                  Não há nenhuma notificação
                </p>
              )}
            </>
          ):(
            <p className="text-xs text-center text-gray-400 py-6 px-2 bg-gray-50 mb-1 rounded-sm animate-pulse">
              Carregando notificações...
            </p>
          )}
        </div>
      </div>
        <button type="button" onClick={handleGoToAllNotificactions} className={`
          hover:bg-gray-50 py-1.5 w-[calc(100%+1rem)] 
          -mx-2 -mb-3 block rounded-b-lg border-t
          text-xs text-gray-400/70 text-center font-semibold
        `}>Ver todas Notificações</button>
    </Dropdown>
  )
}