import { useState } from 'react';
import { arrayToIdsList } from '../utils';
import { useAction } from './use-action.hook';

export const useLogin = (): any => {
  const { updateSession, updateNav, updateLocation, updatePolicy } = useAction();
  const [isUserVerified, setUserIsVerified] = useState(true);
  const [isUserSetupCompleted, setUserIsSetupCompleted] = useState(true);

  const login = (data: any) => {
    const { user, locationId, orgId, locations, nav, policies } = data;

    // Require user verify confirm
    if (user && !user.isActive) {
      updateSession({ user });
      setUserIsVerified(false);
    }

    // Require user complete setup
    if (user && user.isActive && !orgId) {
      updateSession({ user });
      setUserIsSetupCompleted(false);
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
