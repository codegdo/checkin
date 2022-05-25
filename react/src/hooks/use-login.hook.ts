import { useState } from 'react';
import { useAction } from './use-action.hook';

export const useLogin = (): any => {
  const { updateSession, retrieveNav, retrieveLocation, retrievePolicy } = useAction();
  const [isUserVerified, setIsUserVerified] = useState(true);
  const [isUserSetupCompleted, setIsUserSetupCompleted] = useState(true);

  const login = (data: any) => {
    const { user, locationId, orgId, locations, nav, policies } = data;

    if (user) {
      // require user verify confirm
      if (!user.isActive) {
        setIsUserVerified(false);
      }

      // require user complete setup
      if (user.isActive && !orgId) {
        setIsUserSetupCompleted(false);
      }

      updateSession({ user });
    }

    // User login
    if (user && orgId) {
      updateSession({
        user,
        orgId,
        locationId,
      });
      retrieveNav(nav);
      retrieveLocation(locations);
      retrievePolicy(policies);
    }
  };

  return [{ isUserVerified, isUserSetupCompleted }, login];
};
