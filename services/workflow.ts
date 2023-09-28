import { ResultAndResponse, SimpleFlowAuthType, WorkflowType } from "../../shared-types";
import { handleErrorResultAndResponse, headerBearer, wf } from "./conn/api";

export let cachePublishedFlows : {
  token: string,
  data: WorkflowType[]
} | null= null;
export const clearCachePublishedFlows = () => cachePublishedFlows = null;
interface ResponseWorkflows extends ResultAndResponse{
  data?: WorkflowType[]
}
export const getPublishedFlows = async (token: string) : Promise<ResponseWorkflows> => {
  if(cachePublishedFlows && cachePublishedFlows.token === token){
    console.log('[cached-published-flows]');
    return {
      result: true,
      response: 'Consulta realizada com sucesso',
      data: cachePublishedFlows.data
    };
  }
  try{
    const { data } = await wf.get(`/flows/published`, headerBearer(token));
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
/** { [token]: { [flow_id]: Array<{ users, total }> }} */
let cacheFlowAuths : Record<string, Record<string, {
  users: SimpleFlowAuthType[],
  total: number
}>> = {}
const getFlowAuthsOnCache = (token: string, flow_id: string) : {
  users: SimpleFlowAuthType[],
  total: number
} | undefined => {
  if(cacheFlowAuths[token] && cacheFlowAuths[token][flow_id]) return cacheFlowAuths[token][flow_id];
  return;
}
const pushFlowAuthsOnCache = (token: string, flow_id: string, total: number, users: SimpleFlowAuthType[]) => {
  if(!cacheFlowAuths[token]) cacheFlowAuths[token] = {}
  if(!cacheFlowAuths[token][flow_id]) cacheFlowAuths[token][flow_id] = { total, users: [] }

  const ids = users.map((u) => u._id)
  const newUsers = [
    ...cacheFlowAuths[token][flow_id].users.filter((cacheUser) => !ids.includes(cacheUser._id)),
    ...users
  ]
  cacheFlowAuths[token][flow_id] = {
    total: newUsers.length > total ? newUsers.length : total,
    users: newUsers
  }
}
interface GetFlowAuthsResponse extends ResultAndResponse{
  data?: {
    users: SimpleFlowAuthType[],
    total: number
  }
}
export const getFlowAuths = async (token: string, flow_id: string, exclude_ids: string[] = [], auth_email?: string) : Promise<GetFlowAuthsResponse> => {
  try{
    const cache = getFlowAuthsOnCache(token, flow_id)
    if(cache){
      if(auth_email){
        const findedUser = cache.users.find(user => user.auth_email === auth_email)
        if(findedUser){
          console.log('[cached-flow-auths]')
          return {
            result: true,
            response: 'Usuário encontrado',
            data: {
              users: [findedUser],
              total: cache.total
            }
          }
        }
      }
      else{
        const filteredUsers = cache.users.filter((user) => !exclude_ids.includes(user._id))
        if(exclude_ids.length === 0 || filteredUsers.length >= 10){
          console.log('[cached-flow-auths]')
          return {
            result: true,
            response: 'Usuários carregados',
            data: {
              users: filteredUsers,
              total: cache.total
            }
          }
        }
      }
    }
  }catch(e){}
  try{
    const { data } = await wf.post<GetFlowAuthsResponse>(`/flow-auth/get-users/${flow_id}`, {
      exclude_ids,
      auth_email,
    }, headerBearer(token))
    console.log('[requested-flow-auths]')

    if(data.result && data.data) pushFlowAuthsOnCache(token, flow_id, data.data.total, data.data.users)
    
    return data
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível obter os usuários desse fluxo'
    })
  }
}