import { Dropdown } from "../../../utils/Dropdown"
import { EnvelopeOpenIcon, NotificationIcon } from "../../../utils/icons"
import { NotificationIconOrDefaultByType } from "./NotificationIconOrDefaultByType";
import { shortclass } from "../../../utils/shortclass";
import { useNotifications } from "./Hook";

export const BellNotification = () => {
  const {
    handleGoToAllNotificactions,
    handleMarkAsViewed,
    notifications,
    onDetails,
    unvieweds
  } = useNotifications();

  // [ ] QUANDO CLICAR NA NOTIFICAÇÃO DEVE ABRIR A NOTIFICAÇÃO EM UM MODAL PARA VE-LA COMPLETA
  //     [ ] AO ABRIR DEVE MARCAR A NOTIFICAÇÃO COMO VISUALIZADA
  //     [ ] COLOCAR UM SETTIMEOUT DE 5 SEGUNDOS PARA REMOVER A NOTIFICAÇÃO DA TELA APÓS VISUALIZADA
  //     [ ] DEVE TER ALGUM BOTÃO DE REDIRECIONAMENTO PARA AÇÃO
  //     [ ] CASO TENHA TEMPLATE DO TIPO PLATAFORMA DEVE TER ALGUM LINK PARA ABRIR EM OUTRA PÁGINA
  // [ ] QUANDO FAZER O HOVER ENCIMA DO ITEM, DEVE REVELAR UM BOTÃO POR CIMA NA LATERAL DIREITA, PARA MARCAR COMO VISUALIZADO
  // [x] O BOTÃO VER TODAS DEVE REDIRECIONAR PARA A TELA DE NOTIFICAÇÃO
  // [x] LIDAR COM CASH
  // [x] LIDAR COM LAST NOTIFICATION E ATUALIZAÇÃO DE NOTIFICAÇÕES
  // [ ] DISPARAR ALERTA SONORO QUANDO CHEGAR NOVAS NOTIFICAÇÕES.
  
  return (
    <Dropdown
      classNames={{ 
        list: `
        absolute right-0 z-50
        -mt-1 w-56 origin-top-right rounded-md
        bg-gray-100/40 backdrop-blur-[25px] shadow-lg
        ring-1 ring-black ring-opacity-5
        focus:outline-none pb-2
        `
      }}
      trigger={
        <div className="relative mt-0.5 -mb-0.5">
          <NotificationIcon className="text-primary-800"/>
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
                <div
                  className={`
                    ${shortclass.dropdownItemTranslucent}
                    !flex flex-col overflow-hidden
                    !text-primary-900
                    relative
                    hover:bg-gray-900/5
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

                  <div className="absolute inset-0 flex opacity-0 hover:opacity-100">
                    <button
                      type="button"
                      className="flex-1 border-none outline-none ring-0"
                      onClick={() => onDetails(notification)}
                    />
                    <button
                      type="button"
                      className="bg-gray-50/50 text-gray-700 border-none outline-none ring-0 px-3"
                      onClick={() => handleMarkAsViewed(notification.id)}
                    >
                      <EnvelopeOpenIcon w={20} h={20}/>
                    </button>
                  </div>
                </div>
              )):(
                <p className="text-xs text-center text-gray-500 py-6 px-2 bg-gray-50/50 mb-1 rounded-sm">
                  Não há nenhuma notificação
                </p>
              )}
            </>
          ):(
            <p className="text-xs text-center text-gray-400 py-6 px-2 bg-gray-50/50 mb-1 rounded-sm animate-pulse">
              Carregando notificações...
            </p>
          )}
        </div>
      </div>
      <button type="button" onClick={handleGoToAllNotificactions} className={`
        hover:bg-gray-50/50 py-1.5 w-[calc(100%+1rem)] 
        -mx-2 -mb-3 block rounded-b-lg border-t
        text-xs text-gray-400/70 text-center font-semibold
      `}>Ver todas Notificações</button>
    </Dropdown>
  )
}