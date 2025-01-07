import { storageKeys } from "../../contexts/AuthContext";
import { ResultAndResponse, User, PossiblePermissions, Permition } from "../../shared-types";
import { getDomain } from "../../shared-types/utils/routes";
import { headerBearer, handleErrorResultAndResponse, portal } from "./conn/api";

export const cachedUser = new (class CachedUser {
  protected _val: User | undefined;
  get(){ return this._val }
  set(user: User | undefined){ this._val = user; }
})()

export interface ResponseMeAuth extends ResultAndResponse{
  data?: User
}
export async function me(token: string) : Promise<ResponseMeAuth>{
  const user = cachedUser.get();

  if(user){
    console.log('[cached-user]');
    return {
      result: true,
      response: 'Dados do usuário carregado',
      data: user
    }
  }

  console.log('[request-refresh-user]');
  try{
    const { data } = await portal.get<User>('/auth/me', headerBearer(token));
    
    let permitions = handleFormatPermitionsSlug(data.permitions) as PossiblePermissions[];
    data.permitions_slug = permitions;
    data.token = token;
    if(data.current_client && data.clients){
      const client = data.clients.find((client) => client.id === data.current_client)
      const redirect = (url: string, token: string) => window.location.href = `${url}#/?token=${token}`
      if(client?.dedicated_server){
        const isHub = getDomain('hub') === '';
        /**
         * Para funcionar como esperado a url registrada deve ser a URL do HUB dedicado, e a url \
         * deve ser igual do isac, adicionando hub. no começo, exemplo:
         * 
         * https://hub.url_dedicada.com.br (hub) -- salva no client.dedicated_server
         * https://url_dedicada.com.br (isac)
         */
        let url = isHub ? client.dedicated_server : client.dedicated_server.replace('://hub.','://');
        if(window.location.origin !== url){
          if(!sessionStorage.getItem('isac@ignore-redirect-dedicated-server')) redirect(url, token);
        }
      }
      else{
        const original_url = (() : string | undefined => {
          //@ts-ignore
          try{ return process.env.REACT_APP_RELATIVE_URL; }catch(e){}
          //@ts-ignore
          try{ return import.meta.env.VITE_RELATIVE_URL; }catch(e){}
          return undefined;
        })

        if(original_url && typeof original_url === 'string') redirect(original_url, token);
      }
    }
    
    cachedUser.set(data);

    return {
      result: true,
      response: 'Dados do usuário carregado',
      data
    };
  }
  catch(e: any){
    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Houve um erro ao carregar informações do usuário'
    });
  }
}
export async function logout() : Promise<ResultAndResponse>{
  sessionStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.token);

  cachedUser.set(undefined)

  return new Promise((resolve) => {
    resolve({
      result: true,
      response: 'Logout efetuado com sucesso'
    });
  });
}
export interface ChangeCurrentClientResponseType extends ResultAndResponse{
  data?: {
    token: string,
    permitions: Permition[],
    permitions_slug: PossiblePermissions[]
  }
}
export async function changeCurrentClient(client_id: string, token: string) : Promise<ChangeCurrentClientResponseType>{
  try{
    const { data } = await portal.get(`/auth/token/${client_id}`, headerBearer(token));

    let permitions_slug = handleFormatPermitionsSlug(data.permitions);

    const user = { ...data, permitions_slug }
    cachedUser.set(user);

    return {
      result: true,
      response: 'Empresa alterada com sucesso',
      data: user
    };
  }catch(e){
    console.error(e);
    return {
      result: false,
      response: 'Houve um erro ao alterar a empresa'
    };
  }
}

function handleFormatPermitionsSlug(permitions: undefined | any | any[]) : string[]{
  if(permitions &&
    Array.isArray(permitions) && 
    permitions.length > 0 && 
    typeof permitions[0] === 'string'
  ) return permitions;

  return [];
}