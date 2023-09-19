import { ResultAndResponse } from "../../shared-types"
import { NotificationType, NotificationTypeType } from "../../shared-types/notification.type"
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
    datas.forEach((notification) => {
      if(!notificationIds.includes(notification.id)) cacheNotification[token].datas.unshift(notification)
    })
    if(total > -1) cacheNotification[token].total = total
  }
}
const removeNotificationOnCache = (token: string, id: string) => {
  if(cacheNotification[token] && cacheNotification[token].datas){
    const findedNotification = cacheNotification[token].datas.find(data => data.id === id)

    if(findedNotification){
      cacheNotification[token].datas = cacheNotification[token].datas.filter((d) => d.id !== id)
      cacheNotification[token].total = cacheNotification[token].total - 1
    }
  }
}

interface NotificationsResponse extends ResultAndResponse{
  data?: {
    datas: NotificationType[],
    total: number
  }
}
export const getNotifications = async ({ last_notification_id, skip, token, viewed, type, is_archived }:{
  token: string
  last_notification_id?: string,
  skip?: number,
  viewed?: boolean,
  type?: NotificationTypeType
  is_archived?: boolean,
}) : Promise<NotificationsResponse> => {
  console.log({ last_notification_id })
  try{
    if(
      !viewed &&
      !type &&
      !is_archived &&
      !skip && 
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
    const params = []
    if(last_notification_id) params.push(`last_notification_id=${last_notification_id}`)
    if(skip) params.push(`skip=${skip}`)
    if(viewed) params.push(`viewed=true`)
    if(type) params.push(`type=${type}`)
    if(is_archived) params.push(`is_archived=true`)

    const { data } = await portal.get<NotificationsResponse>(`/notification${params.length > 0 ?
      `?${params.join('&')}`:''
    }`,headerBearer(token))

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
export const markAsViewed = async (ids: string[], token: string, unviewed = false) : Promise<ResultAndResponse> => {
  try{
    const { data } = await portal.put(`/notification/status/${unviewed ? 'unviewed':'viewed'}`, {
      data: ids
    }, headerBearer(token))

    if(data.result) ids.forEach(id => removeNotificationOnCache(token, id))

    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível marcar essa notificação com visualizada'
    })
  }
}
export const markAsArchived = async (ids: string[], token: string, unarchived = false) : Promise<ResultAndResponse> => {
  try{
    const { data } = await portal.put(`notification/status/${unarchived ? 'isnt_archived':'is_archived'}`, {
      data: ids
    }, headerBearer(token))

    if(data.result) ids.forEach(id => removeNotificationOnCache(token, id))
    
    return data
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível arquivar essa notificação'
    })
  }
}