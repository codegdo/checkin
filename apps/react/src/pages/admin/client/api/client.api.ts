import { useEffect } from "react";
import { useFetch } from "@/hooks";

interface Account {
  accountId: string;
  companyId: number;
  companyName: string;
}

export const useGetAllClients = (params?: Record<string, string | number>) => {
  const api = useFetch<Account[]>('/admin/clients', { ...params });

  useEffect(() => {
    api.query();
  }, []);

  return { ...api }
}

export const useGetLoginClients = (params?: Record<string, string | number>) => {
    return useFetch<Account[]>('/admin/clients', { ...params });
}