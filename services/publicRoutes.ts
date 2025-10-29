import { ResultAndResponse } from "../../shared-types";
import { handleErrorResultAndResponse, wf } from "./conn/api";

export interface CreatePublicPostDataBody{
  data: Record<string, any>,
}
export const requestPublicPost = async ({ flow_id, variation, fields }:{
  flow_id: string,
  variation: string,
  fields: CreatePublicPostDataBody
}) : Promise<ResultAndResponse & { data?: any[]}> => {
  try{
    const { data } = await wf.post(`/flow-data/datas/${flow_id}/${variation}`, fields);

    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Houve um erro ao tentar processar essa solicitação'
    })
  }
}

export const requestPublicGet = async ({ flow_id, params, variation }:{
  flow_id: string,
  variation: string,
  params: Record<string, any>
}) : Promise<ResultAndResponse & { data?: any[]}> => {
  try{
    const { data } = await wf.get(`/flow-data/datas/${flow_id}/${variation}?${
      Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    }`)

    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Houve um erro ao tentar processar essa solicitação'
    })
  }
}

let requestCache : Record<string, {
  payload: string,
  response: any
}[]>= {}

export const requestCacher = async ({ key, payload, callback }:{
  key: string,
  payload: string,
  callback: () => Promise<any>
}) => {
  if(requestCache[key]){
    const findedCache = requestCache[key].find((req) => req.payload === payload)
    if(findedCache){
      console.log(`[${key}:cached]`)
      return findedCache.response;
    }
  }
  else requestCache[key] = [];

  console.log(`[${key}:requested]`);
  const res = await callback();
  if(res.result) requestCache[key].push({ payload, response: res });
  return res;
}

export const requestPublicGetSteps = async ({ flow_id, params, variation }:{
  flow_id: string,
  variation: string,
  params: Record<string, any>
}) : Promise<ResultAndResponse & { data?: any[]}> => {
  try{
    const { data } = await wf.get(`/steps/datas/${flow_id}/${variation}?${
      Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    }`)

    return data;
  }catch(e){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Houve um erro ao tentar processar essa solicitação'
    })
  }
}