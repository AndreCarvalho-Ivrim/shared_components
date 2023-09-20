import axios from "axios";
import { ResultAndResponse } from "../../../types";
import { authStorageKeys } from "../cache";

export const getUrls = (environment: 'front' | 'back' ) => {
  if(environment === 'front'){
    let urls = { portal: '', wf: '' }
    try{
      // @ts-ignore
      const WORKFLOW_MODULE = process.env.REACT_APP_WORKFLOW_MODULAR;
      urls.wf = WORKFLOW_MODULE!;
    }catch(e){ }
    try{
      // @ts-ignore
      const PORTAL = import.meta.env.VITE_PORTAL_URL;
      urls.portal = PORTAL!;
    }catch(e){ }
    
    return urls
  }
  if(environment === 'back'){
    let urls = { portal: '', wf: '' }
    try{
      // @ts-ignore
      const PORTAL = process.env.REACT_APP_BASE_URL;
      // @ts-ignore
      const WF = process.env.REACT_APP_API_WF_URL;
      urls.wf = WF!;
      urls.portal = PORTAL!;
    }catch(e){ }
    try{
      // @ts-ignore
      const WF = import.meta.env.VITE_BASE_URL;
      // @ts-ignore
      const PORTAL = import.meta.env.VITE_AUTH_URL;
      urls.wf = WF!;
      urls.portal = PORTAL!;
    }catch(e){ }
    
    return urls
  }
}

const baseURL = getUrls('back')!;

export const wf = axios.create({
  baseURL: baseURL.wf,
});
export const portal = axios.create({
  baseURL: baseURL.portal
})

export const invalidTokenJWT = () => {
  sessionStorage.removeItem(authStorageKeys.user);
  sessionStorage.removeItem(authStorageKeys.token);
  localStorage.removeItem(authStorageKeys.user);
  localStorage.removeItem(authStorageKeys.token);

  window.location.reload();
}

export const headerBearer = (token: string) => ({
  headers: {
    "Authorization": `Bearer ${token}`,
  }
});

export const handleErrorResultAndResponse = (e: any, defaultReturn?: ResultAndResponse) : ResultAndResponse => {
  if(e.response && e.response.data){
    if(typeof e.response.data === 'string') return {
      result: false,
      response: e.response.data
    };
    
    if(e.response.data.message && e.response.data.message === 'Invalid JWT token') invalidTokenJWT();
    if([true, false].includes(e.response.data.result) && e.response.data.response) return e.response.data;
  }  


  if(defaultReturn) return defaultReturn;
  
  return {
    result: false,
    response: 'Houve um erro inesperado ao executar essa função'
  }
}