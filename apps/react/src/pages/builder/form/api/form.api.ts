import { useEffect } from "react";
import { useFetch } from "@/hooks";
import { Field } from "@/components/types";
import { useLocation } from "react-router-dom";

interface IForm {
  id: number | string;
  name: string;
  title: string;
  descriptiong: string;
  data: Field[];
  version: number;
}

export const useGetAllForms = (params?: Record<string, string | number>) => {
  const api = useFetch<IForm[]>('/builder/forms', { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return { ...api }
}

export const useGetFormById = (params?: Record<string, string | number>) => {
  const location = useLocation();

  // Extract the ID from the pathname
  const id = location.pathname.split("/").pop();

  const api = useFetch<IForm>(`/builder/forms/${id}`, { ...params });

  useEffect(() => {
    if (id) {
      api.query();
    }
  }, [id]);

  return { ...api };
};