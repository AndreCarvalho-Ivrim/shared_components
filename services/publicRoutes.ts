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