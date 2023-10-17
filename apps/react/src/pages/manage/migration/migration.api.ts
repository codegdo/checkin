import { useFetch } from "@/hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getAllMigrations = (params?: Record<string, string | number>) => useFetch('/v1/manage/migrations', { ...params });
