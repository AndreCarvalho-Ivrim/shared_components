import { DashboardType, ResultAndResponse } from "../../shared-types";

import { headerBearer, handleErrorResultAndResponse, portal } from "./conn/api";

let cacheDashboards : { token: string, onlyActive: boolean, data: DashboardsResponse }[] = []
export const clearCacheDashboards = () => cacheDashboards = [];

interface DashboardResponse extends ResultAndResponse{
  data?: DashboardType;
}
interface DashboardsResponse extends ResultAndResponse{
  data?: DashboardType[];
}
export const getDashboards = async (token: string, onlyActive: boolean = false) : Promise<DashboardsResponse> => {
  try{
    const findedCache = cacheDashboards.find(cache => cache.token === token && cache.onlyActive === onlyActive);
    if(findedCache){
      console.log('[cached-get-dashboards]');
      return findedCache.data;
    }
  }catch(e){ clearCacheDashboards() }

  try{
    console.log('[requested-get-dashboards]');
    const { data } = await portal.get(`/dashboard${onlyActive ? `/?onlyActive=true`:''}`, headerBearer(token));
    
    if(!data.result) throw new Error(
      data.response
    );

    cacheDashboards.push({ token, onlyActive, data })
    
    return data;
  }catch(e){
    console.error(e);

    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível carregar as Dashboards'
    });
  }
}
export const getDashboardBySlug = async (token: string, slug: string) : Promise<DashboardResponse> => {
  try{
    const resGet = await getDashboards(token, true)

    if(!resGet.result) return {
      result: resGet.result,
      response: resGet.response
    }

    let findedDashboard = (resGet.data ?? []).find(
      (dash) => dash.slug === slug
    )
    
    if(!findedDashboard) return {
      result: false,
      response: 'Dashboard não encontrada'
    }

    return {
      result: true,
      response: 'Dashboard localizada com sucesso',
      data: findedDashboard
    }
  }catch(e){
    console.error(e);

    return handleErrorResultAndResponse(e, {
      result: false,
      response: 'Não foi possível carregar as Dashboards'
    });
  }
}