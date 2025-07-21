import { EnvelopeOpenIcon } from "../../../utils/icons";
import { shortclass } from "../../../utils/shortclass";
import { useNotifications } from "./Hook"
import { NotificationIconOrDefaultByType } from "./NotificationIconOrDefaultByType";

export const CardNotification = () => {
  const { handleGoToAllNotificactions, handleMarkAsViewed, notifications, onDetails, unvieweds } = useNotifications();

  return (
    <div className="h-full bg-gray-50/20 backdrop:blur-lg rounded-xl overflow-hidden flex flex-col flex-1">
      <strong className="bg-gray-50/40 block w-full text-xs text-center uppercase font-semibold py-1 px-2">Notificações</strong>

      <div className="flex flex-col gap-1 flex-1">
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
              <p className="text-sm text-center text-gray-200 py-6 px-2 rounded-sm h-full flex items-center justify-center">
                Não há nenhuma<br/>
                notificação não lida
              </p>
            )}
          </>
        ):(
          <p className="text-sm text-center text-gray-200 py-6 px-2 rounded-sm h-full flex items-center justify-center">
            Carregando notificações...
          </p>
        )}
      </div>
      <button type="button" onClick={handleGoToAllNotificactions} className={`
        hover:bg-gray-50/10 py-1.5 w-[calc(100%+1rem)] 
        mt-auto block rounded-b-lg border-t border-gray-300/20
        text-xs text-gray-300 text-center font-medium
      `}>Ver todas Notificações</button>
    </div>
  )
}