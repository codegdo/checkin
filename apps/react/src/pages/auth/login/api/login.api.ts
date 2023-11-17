import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAction, useFetch } from "@/hooks";
import { UserData, SessionData, ModelData } from "@/store/types";
import { AppStatus } from "@/constants";


interface UserLogin {
  session: SessionData,
  model: ModelData,
  user: UserData,
}

export const useLoginApi = () => {
  const { updateSession, updateUser, updateModel } = useAction();
  const { status, isSuccess, data, mutation } = useFetch<UserLogin>('/auth/login');
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const { model, user } = data;

        updateUser(user);

        if (user.isActive && user.roleType) {
          const clientId = user.roleType === 'System' ? null : user.companyId;

          updateSession({ clientId, status: AppStatus.AUTHENTICATED, auth: true });

          updateModel(model);

          //
          navigate('/');
        }
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess, navigate, updateModel, updateSession, updateUser]);

  return { status, data, mutation };
};
