import { useFetch } from "@/hooks";
const FORM_API_PATH = '/builder/forms';

export type FetchProducts = ReturnType<typeof useFetchProducts>;
export type SaveProducts = ReturnType<typeof useSaveProducts>;

export enum OverviewApiAction {
  GET_ALL_PRODUCTS = 'fetchProducts',
  SAVE_PRODUCTS = 'saveProducts'
}

export const useFetchProducts = (params?: Record<string, string | number>) => {

  const api = useFetch(`${FORM_API_PATH}/products`, { ...params });

  return api;
};

export const useSaveProducts = (params?: Record<string, string | number>) => {

  const api = useFetch(`${FORM_API_PATH}/products`, { ...params });

  return api;
};