import { ResultAndResponse } from "../../shared-types"
import { ActivityPanelType } from "../../shared-types/activity_panel.type"
import { handleErrorResultAndResponse, headerBearer, portal } from "./conn/api"

let cacheActivityPanel : Record<string, ActivityPanelType[]> = {}
interface GetActivityPanelResponse extends ResultAndResponse{
  data?: ActivityPanelType[]
}
export const getActivityPanel = async (token: string) : Promise<GetActivityPanelResponse> => {
  try{
    if(cacheActivityPanel[token]){
      console.log('[cached-activity-panel]');
      return {
        result: true,
        response: 'Painel carregado com sucesso',
        data: cacheActivityPanel[token]
      }
    }
    
  }catch(e){}

  try{
    console.log('[requested-activity-panel]');
    const { data } = await portal.get('/activity-panel', headerBearer(token));

    if(data.result && data.data) cacheActivityPanel[token] = data.data;
    
    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível carregar o painel de atividades'
    })
  }
}