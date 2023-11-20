import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAction, useFetch } from "@/hooks";
import { SessionData, ModelData, CompanyData, UserData, ThemeData } from "@/store/types";
import { AppStatus } from "@/constants";

interface UserLogin {
  session: SessionData;
  model: ModelData;
  company: CompanyData;
  user: UserData;
  theme: ThemeData;
}

export const useLoginApi = () => {
  const { updateRootState } = useAction();
  const { status: fetchStatus, isSuccess, data, mutation } = useFetch<UserLogin>('/auth/login');
  const { state: history } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const { model, company, user, theme } = data;

        if (user.isActive && user.roleType) {
          const isSystemRole = user.roleType === 'System';
          const isActiveCompany = company.isActive;
          const appStatus = isSystemRole || isActiveCompany ? AppStatus.AUTHENTICATED : AppStatus.INACTIVE;
          const pathname = history.pathname || '/';

          const session = {
            status: appStatus,
            accessType: user.roleType.toLowerCase(),
            clientId: isSystemRole ? null : company.id,
            isAuth: true
          };

          updateRootState({
            session,
            model,
            company,
            user,
            theme,
          });

          navigate(pathname);
        }
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess, history, navigate, updateRootState]);

  return { status: fetchStatus, data, mutation };
};
