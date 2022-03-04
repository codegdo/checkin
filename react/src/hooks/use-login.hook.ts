import { useState } from "react";
import { useAction } from "./use-action.hook";

export const useLogin = (): any => {

  const { updateSession, updateNav, updatePolicy } = useAction();
  const [isVerified, setIsVerified] = useState(true);
  const [isSetupCompleted, setIsSetupCompleted] = useState(true);

  const login = (data: any) => {
    const { user, orgId, accessToken, nav, policies } = data;

    // Require user verify confirm
    if (user && !user.isActive) {
      updateSession({ user });
      setIsVerified(false);
    }

    // Require user complete setup
    if (user && user.isActive && !orgId) {
      updateSession({ user });
      setIsSetupCompleted(false);
    }

    // User login
    if (user && orgId) {
      updateSession({
        isLogin: true,
        user,
        orgId
      });
      updateNav(nav);
      updatePolicy(policies);
    }
  }

  return [{ isVerified, isSetupCompleted }, login]
}