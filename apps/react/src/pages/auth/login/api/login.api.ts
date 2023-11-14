import { useFetch } from "@/hooks";

export const useLoginApi = () => useFetch('/auth/login');