import { storageKeys } from "../../contexts/AuthContext";
import { ResultAndResponse, User, PossiblePermissions, Permition } from "../../shared-types";
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