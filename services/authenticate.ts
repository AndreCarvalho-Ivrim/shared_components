import { storageKeys } from "../../contexts/AuthContext";
import { ResultAndResponse, User, PossiblePermissions, Permition, UserCategory } from "../../shared-types";
import { headerBearer, handleErrorResultAndResponse, portal } from "./conn/api";

export interface ResponseMeAuth extends ResultAndResponse{
  data?: User
}
export async function me(token: string) : Promise<ResponseMeAuth>{
  console.log('[request-refresh-user]');
  try{
    const { data } = await portal.get<User>('/me', headerBearer(token));
    let current_client : string | null = data.current_client ? data.current_client : (
      // @ts-ignore
      data.currentClientId ?? null
    );
    
    let permitions : PossiblePermissions[] = [];
    if(data.userCategories && Array.isArray(data.userCategories)){
      data.userCategories.forEach((userCat: any) => {
        const userCategory : UserCategory = userCat.userCategory;

        if(userCategory.clientId !== current_client) return;
        
        if(userCategory.permitions && Array.isArray(userCategory.permitions) && userCategory.permitions.length > 0){
          userCategory.permitions.forEach((perm: any) => {
            if(!perm.permition) return;
            if(perm.permition.slug) permitions.push(perm.permition.slug as PossiblePermissions)
          })
        }
      });
    }

    handleFormatPermitionsSlug(data.permitions);

    return {
      result: true,
      response: 'Dados do usuário carregado',
      data: {
        ...data,
        ...(current_client ? { current_client }:{} ),
        client_name: ( data.client_name ? data.client_name : (
          current_client ? data.clients?.find(c => c.id === current_client)?.nome_fantasia : ''
        )),
        token,
        permitions_slug: permitions
      }
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
  sessionStorage.removeItem(storageKeys.user);
  sessionStorage.removeItem(storageKeys.token);
  localStorage.removeItem(storageKeys.user);
  localStorage.removeItem(storageKeys.token);

  return new Promise((resolve) => {
    resolve({
      result: true,
      response: 'Logout efetuado com sucesso'
    });
  });
}
interface ChangeCurrentClientResponseType extends ResultAndResponse{
  data?: {
    token: string,
    permitions: Permition[],
    permitions_slug: PossiblePermissions[]
  }
}
export async function changeCurrentClient(client_id: string, token: string) : Promise<ChangeCurrentClientResponseType>{
  try{
    const { data } = await portal.get(`/token/${client_id}`, headerBearer(token));

    let permitions_slug = handleFormatPermitionsSlug(data.permitions);

    return {
      result: true,
      response: 'Empresa alterada com sucesso',
      data: {
        ...data,
        permitions_slug
      }
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