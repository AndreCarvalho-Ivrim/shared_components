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