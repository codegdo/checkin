import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAction, useFetch } from "@/hooks";
import { SessionData, ModelData, AccountData, UserData, ThemeData, AccessType } from "@/store/types";
import { AppStatus } from "@/constants";

interface UserLogin {
  session: SessionData;
  model: ModelData;
  account: AccountData;
  user: UserData;
  theme: ThemeData;
}

export const useLoginApi = () => {
  const { status: fetchStatus, isSuccess, data, mutation } = useFetch<UserLogin>('/auth/login');
  const { loginSuccess } = useAction();
  const { state: location } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const { model, account, user, theme } = data;

        if (user.isActive && user.roleType) {
          const accessType = user.roleType.toLowerCase()
          const isSystemRole = accessType === AccessType.SYSTEM;
          const isActiveAccount = account.isActive;
          const appStatus = isSystemRole || isActiveAccount ? AppStatus.AUTHENTICATED : AppStatus.INACTIVE;
          const pathname = location?.pathname || '/';

          const session = {
            status: appStatus,
            accessType,
            clientId: isSystemRole ? null : account.companyId,
            isAuth: true
          };

          loginSuccess({
            session,
            model,
            account,
            user,
            theme,
          });

          navigate(pathname);
        }
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess, location, navigate, loginSuccess]);

  return { status: fetchStatus, data, mutation };
};
