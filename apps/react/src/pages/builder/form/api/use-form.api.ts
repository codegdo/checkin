import { useEffect } from "react";
import { useFetch } from "@/hooks";
import { Field } from "@/components/types";
import { useLocation } from "react-router-dom";

export interface IForm {
  id: number | string;
  name: string;
  title: string;
  description: string;
  data: Field[];
  fields: Field[];
  updatedAt: string;
}

export type GetAllForms = ReturnType<typeof useFetchAllForms>;
export type GetFormById = ReturnType<typeof useFetchFormById>;

export enum FormApiAction {
  GET_ALL_FORMS = 'getAllForms',
  GET_FORM_BY_ID = 'getFormById'
}

const FORM_API_PATH = '/builder/forms';

export const useFetchAllForms = (params?: Record<string, string | number>) => {
  const api = useFetch<IForm[]>(FORM_API_PATH, { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return api;
}

export const useFetchFormById = (params?: Record<string, string | number>) => {
  const location = useLocation();

  // Extract the ID from the pathname
  const id = location.pathname.split("/").pop();

  const api = useFetch<IForm>(`${FORM_API_PATH}/${id}`, { ...params });

  useEffect(() => {
    if (id) {
      api.query();
    }
  }, [id]);

  return api;
};