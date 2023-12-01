import { useEffect } from "react";
import { useFetch } from "@/hooks";

interface Migration {
  id: number;
  name: string;
  category: string;
  execution_order: number;
  isExecuted: boolean;
  status: string;
}

export const useGetAllForms = (params?: Record<string, string | number>) => {
  const api = useFetch<Migration[]>('/builder/forms', { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return { ...api }
}