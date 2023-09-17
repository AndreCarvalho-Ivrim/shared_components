import { useEffect, useState } from "react";
import { Dropdown } from "../../../utils/Dropdown"
import { NotificationIcon } from "../../../utils/icons"
import { useAuth } from "../../../../contexts/AuthContext";
import { shortclass } from "../../../../styles/styles";
import { useNotify } from "../../../../contexts/NotifyContext";
import { getNotifications } from "../../../services/notification";
import { NotificationType } from "../../../../shared-types/notification.type";
import { NotificationIconOrDefaultByType } from ".";

export const BellNotification = () => {
  const { toast } = useNotify();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationType[]>();
  
  useEffect(() => { loadNotifications() },[user])

  async function loadNotifications(){
    if(!user) return;

    const res = await getNotifications(user.token)

    if(!res.result) toast.error(res.response)
    if(!res.data) return;
    
    setNotifications(res.data)
  }

  // [ ] QUANDO CLICAR NA NOTIFICAÇÃO DEVE ABRIR A NOTIFICAÇÃO EM UM MODAL PARA VE-LA COMPLETA
  //     [ ] AO ABRIR DEVE MARCAR A NOTIFICAÇÃO COMO VISUALIZADA
  //     [ ] DEVE TER ALGUM BOTÃO DE REDIRECIONAMENTO PARA AÇÃO
  //     [ ] CASO TENHA TEMPLATE DO TIPO PLATAFORMA DEVE TER ALGUM LINK PARA ABRIR EM OUTRA PÁGINA
  // [ ] QUANDO FAZER O HOVER ENCIMA DO ITEM, DEVE REVELAR UM BOTÃO POR CIMA NA LATERAL DIREITA, PARA MARCAR COMO VISUALIZADO
  // [ ] O BOTÃO VER TODAS DEVE REDIRECIONAR PARA A TELA DE NOTIFICAÇÃO
  // [ ] LIDAR COM CASH
  // [ ] LIDAR COM LAST NOTIFICATION E ATUALIZAÇÃO DE NOTIFICAÇÕES

  return (
    <Dropdown
      trigger={
        <NotificationIcon className="text-primary-800 max-sm:hidden"/>
      }
    >
      <div className="flex flex-col gap-1">
        {notifications ? (
          <>
            {notifications.length > 0 ? notifications.map((notification) => (
              <button
                type="button"
                className={`
                  ${shortclass.dropdownItem}
                  !flex flex-col
                  !text-gray-700
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
        
        <button type="button" className={`
          hover:bg-gray-50 py-1.5 w-[calc(100%+1rem)] 
          -mx-2 -mb-3 block rounded-b-lg border-t
          text-xs text-gray-400/70 text-center font-semibold
        `}>Ver todas Notificações</button>
      </div>
    </Dropdown>
  )
}