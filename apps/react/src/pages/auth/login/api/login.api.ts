import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppStatus } from "@/constants";
import { useAction, useFetch } from "@/hooks";
import { UserData } from "@/store/types";

export const useLoginApi = () => {
  const { updateSession, updateUser } = useAction();
  const { status, isSuccess, data, mutation } = useFetch<UserData>('/auth/login');
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const {companyId, roleType, isOwner, ...user} = data;
        updateUser(user);

        if (user.isActive && roleType) {
          updateSession({
            clientId: companyId,
            status: AppStatus.AUTHENTICATED,
            isLoggedIn: true,
            userType: roleType
          });
          navigate('/');
        }
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess, navigate, updateSession, updateUser]);

  return { status, data, mutation };
};
