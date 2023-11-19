import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAction, useFetch } from "@/hooks";
import { SessionData, ModelData, CompanyData, UserData } from "@/store/types";
import { AppStatus } from "@/constants";

interface UserLogin {
  session: SessionData;
  model: ModelData;
  company: CompanyData;
  user: UserData;
}

export const useLoginApi = () => {
  const {updateSession, updateModel, updateCompany, updateUser, updateRootState } = useAction();
  const { status: fetchStatus, isSuccess, data, mutation } = useFetch<UserLogin>('/auth/login');
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = () => {
      if (isSuccess && data) {
        const { model, company, user } = data;

        // updateCompany(company);
        // updateUser(user);

        if (user.isActive && user.roleType) {
          const isSystemRole = user.roleType === 'System';
          const isActiveCompany = company.isActive;
          const appStatus = isSystemRole || isActiveCompany ? AppStatus.AUTHENTICATED : AppStatus.INACTIVE;

          // updateModel(model);
          // updateSession({ 
          //   status: appStatus,
          //   accessType: user.roleType.toLowerCase(),
          //   clientId: isSystemRole ? null : company.id, 
          //   isAuth: true 
          // });
          
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
            theme: {}
          });

          navigate('/');
        }
      }
    };

    handleLoginSuccess();
  }, [data, isSuccess, navigate, updateRootState]);

  return { status: fetchStatus, data, mutation };
};
