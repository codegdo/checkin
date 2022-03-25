import { useState } from "react";
import { useAction } from "./use-action.hook";

export const useLogin = (): any => {

  const { updateSession, updateNav, updateLocation, updatePolicy } = useAction();
  const [isVerified, setIsVerified] = useState(true);
  const [isSetupCompleted, setIsSetupCompleted] = useState(true);

  const login = (data: any) => {
    const { user, orgId, locations, nav, policies } = data;

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
        orgId,
        locationId: locations[0]?.id
      });
      updateNav(nav);
      updateLocation(locations);
      updatePolicy(policies);
    }
  }

  return [{ isVerified, isSetupCompleted }, login]
}