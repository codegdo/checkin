import { useState } from 'react';
import { arrayToIdsList } from '../utils';
import { useAction } from './use-action.hook';

export const useLogin = (): any => {
  const { updateSession, updateNav, updateLocation, updatePolicy } = useAction();
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
      updateNav(nav);
      updateLocation(arrayToIdsList({ key: 'id', values: locations }));
      updatePolicy(policies);
    }
  };

  return [{ isUserVerified, isUserSetupCompleted }, login];
};
