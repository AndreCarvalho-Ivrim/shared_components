import { handleErrorResultAndResponse, headerBearer, portal } from "./conn/api"

export const getAllSession = async (user: any) => {
  try {
    const { data } = await portal.get('/session', headerBearer(user));
    return data;
  } catch (e) {
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível buscar as notificações'
    })
  }
} 