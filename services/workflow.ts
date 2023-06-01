import { ResultAndResponse, WorkflowType } from "../types";
import { handleErrorResultAndResponse, headerBearer, wf } from "./conn/api";

export let cachePublishedFlows : {
  token: string,
  data: WorkflowType[]
} | null= null;
export const clearCachePublishedFlows = () => cachePublishedFlows = null;
interface ResponseWorkflows extends ResultAndResponse{
  data?: WorkflowType[]
}
export const getPublishedFlows = async (token: string, client_id: string) : Promise<ResponseWorkflows> => {
  if(cachePublishedFlows && cachePublishedFlows.token === token){
    console.log('[cached-published-flows]');
    return {
      result: true,
      response: 'Consulta realizada com sucesso',
      data: cachePublishedFlows.data
    };
  }
  try{
    const { data } = await wf.get(`published-flows/${client_id}`, headerBearer(token));
    console.log('[requested-published-flows]')

    if(data.result) cachePublishedFlows = { token, data: data.data };
    return data;
  }catch(e){
    console.error(e);
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Houve um erro ao carregar os fluxos publicados'
    });
  }
}