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

export const useGetAllMigrations = (params?: Record<string, string | number>) => {
  const api = useFetch<Migration[]>('/manage/migrations', { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return { ...api }
}