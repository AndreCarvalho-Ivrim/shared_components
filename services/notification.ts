import { ResultAndResponse } from "../../shared-types"
import { NotificationType } from "../../shared-types/notification.type"
import { handleErrorResultAndResponse, headerBearer, portal } from "./conn/api"

interface NotificationData{
  datas: NotificationType[],
  total: number
}
let cacheNotification : Record<string, NotificationData> = {}
const addNewNotificationsOnCache = (token: string, { datas, total }: NotificationData) => {
  if(!cacheNotification[token]) cacheNotification[token] = { datas, total: total === -1 ? 0 : total }
  else{
    const notificationIds = cacheNotification[token].datas.map((cached) => cached.id);
    datas.reverse().forEach((notification) => {
      if(!notificationIds.includes(notification.id)) cacheNotification[token].datas.unshift(notification)
    })
    if(total > -1) cacheNotification[token].total = total
  }
}
interface NotificationsResponse extends ResultAndResponse{
  data?: {
    datas: NotificationType[],
    total: number
  }
}
export const getNotifications = async ({ last_notification_id, skip, token }:{
  token: string
  last_notification_id?: string,
  skip?: number
}) : Promise<NotificationsResponse> => {
  console.log({ last_notification_id })
  try{
    if(!skip && 
      !last_notification_id && 
      cacheNotification[token] && 
      cacheNotification[token].datas.length > 0
    ){
      console.log('[cached-first-notifications]')
      return {
        result: true,
        response: 'Notificações recuperadas de cache',
        data: cacheNotification[token]
      }
    }
  }catch(e){ console.error('[error-cache-notifications]') }
  try{
    const { data } = await portal.get<NotificationsResponse>(`/notification${last_notification_id ? 
      `?last_notification_id=${last_notification_id}`:''}`, 
      headerBearer(token)
    )

    if(!skip) console.log(
      last_notification_id ? 
      `[updated-notifications:${(data.data?.datas ?? []).length}]` : 
      '[requested-notifications]'
    )

    // CACHE NÃO APLICÁVEL À PÁGINAÇÃO
    if(data.data && !skip) addNewNotificationsOnCache(token, data.data);
    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível buscar as notificações'
    })
  }
}
export const markAsViewed = async (id: string, token: string) : Promise<ResultAndResponse> => {
  try{
    const { data } = await portal.put(`/notification/viewed/${id}`, {}, headerBearer(token))

    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível marcar essa notificação com visualizada'
    })
  }
}