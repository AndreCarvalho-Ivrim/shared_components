import { ResultAndResponse } from "../../shared-types"
import { NotificationType } from "../../shared-types/notification.type"
import { handleErrorResultAndResponse, headerBearer, portal } from "./conn/api"

interface NotificationsResponse extends ResultAndResponse{
  data?: NotificationType[]
}
export const getNotifications = async (token: string) : Promise<NotificationsResponse> => {
  try{
    const { data } = await portal.get('/notification', headerBearer(token))

    if(!data.result) throw new Error(data.response)
    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível buscar as notificações'
    })
  }
}