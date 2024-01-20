import { useFetch } from "@/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FORM_API_PATH = '/builder/forms';

export const useFetchFormById = (params?: Record<string, string | number>) => {
  const location = useLocation();

  // Extract the ID from the pathname
  const id = location.pathname.split("/").pop();

  const api = useFetch(`${FORM_API_PATH}/${id}`, { ...params });

  useEffect(() => {
    if (id) {
      api.query();
    }
  }, [id]);

  return api;
};

export const useFetchProduct = (params?: Record<string, string | number>) => {
 
  const api = useFetch(`${FORM_API_PATH}/products`, { ...params });

  return api;
};

export const useSaveProduct = (params?: Record<string, string | number>) => {
 
  const api = useFetch(`${FORM_API_PATH}/products`, { ...params });

  return api;
};