import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppStatus } from "@/constants";
import { useAction, useFetch } from "@/hooks";
import { AppState } from "@/store/reducers";
import { UserData } from "@/store/types";

export const useLoginApi = () => {
  const { updateStatus, updateUser } = useAction();
  const { status, isSuccess, data, mutation } = useFetch<UserData>('/auth/login');
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      updateUser(data);

      if (data.isActive) {
        updateStatus({ current: AppStatus.AUTHENTICATED, isLoggedIn: true });
        navigate('/');
      }
    }
  }, [data, isSuccess, navigate, updateStatus, updateUser]);

  return { status, data, mutation };
};
