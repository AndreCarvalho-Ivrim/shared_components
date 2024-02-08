import { ResultAndResponse } from "../../types";
import { GalleryItemType, GalleryType } from "../../types/gallery.type";
import { getUrls, handleErrorResultAndResponse, headerBearer, portal } from "./conn/api";


interface GetGalleryItemsResponse extends ResultAndResponse {
    data?: GalleryType
  }

interface GetGalleriesResponse extends ResultAndResponse {
    data?: GalleryType[]
  }

interface GetRecentsResponse extends ResultAndResponse {
    data?: GalleryItemType[]
  }

export const getGalleries = async (token: string): Promise<GetGalleriesResponse> => {
    try {
      const { data } = await portal.get<GetGalleriesResponse>('/gallery', headerBearer(token));
  
      if (!data.result) throw new Error(data.response);
      return {
        ...data,
        data: (data.data ?? []).map((gallery) => __parseGallery(gallery))
      };
    } catch (e) {
      return handleErrorResultAndResponse(e, {
        result: false,
        response: 'Não foi possível carregar suas galerias de arquivos'
      })
    }
  }
  export const getRecentsFromAllGalleries = async (token: string): Promise<GetRecentsResponse> => {
    try {
      const { data } = await portal.get<GetRecentsResponse>('/gallery/recents', headerBearer(token));
  
      if (!data.result) throw new Error(
        data.response
      )
  
      return {
        ...data,
        data: data.data?.map(item => __parseGalleryItem(item))
      };
    } catch (e) {
      return handleErrorResultAndResponse(e, {
        result: false,
        response: 'Não foi possível obter os arquivos modificados recentemente'
      })
    }
  }

  export const getGalleryItems = async (token: string, gallery_id: string): Promise<GetGalleryItemsResponse> => {
    try {
      const { data } = await portal.get<GetGalleryItemsResponse>(`/gallery/${gallery_id}`, headerBearer(token));
  
      if (!data.result) throw new Error(
        data.response
      )
  
      return {
        ...data,
        data: (data.data ? __parseGallery(data.data) : data.data)
      };
    } catch (e) {
      return handleErrorResultAndResponse(e, {
        result: false,
        response: 'Não foi possível carregar a galeria de arquivos!'
      })
    }
  }

  export function __parseGallery(gallery: GalleryType) : GalleryType{
    return {
      ...gallery,
      num_items: gallery.num_items ?? 0,
      total_size: gallery.total_size ?? 0,
      items: gallery.items?.map(item => __parseGalleryItem(item))
    }
  }

  export function __parseGalleryItem(item: GalleryItemType): GalleryItemType {
    return { ...item, src: `${getUrls('back')!.portal}${item.src}` }
  }