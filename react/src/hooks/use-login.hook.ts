import { useState } from 'react';
import { useAction } from './use-action.hook';

export const useLogin = (): any => {
  const { getSession, getNav, getLocations, getPolicies } = useAction();
  const [isUserVerified, setIsUserVerified] = useState(true);
  const [isUserSetupCompleted, setIsUserSetupCompleted] = useState(true);

  const login = (data: any) => {
    const { user, locationId, orgId, locations, nav, policies } = data;

    // check user
    if (user) {

      // has org
      if (orgId) {
        getSession({
          user,
          orgId,
          locationId,
        });
        getNav(nav);
        getLocations(locations);
        getPolicies(policies);

      } else {
        // verify confirm
        if (!user.isActive) {
          setIsUserVerified(false);
        }

        // complete setup
        if (user.isActive && !orgId) {
          setIsUserSetupCompleted(false);
        }

        getSession({ user });
      }
    }
  };

  return [{ isUserVerified, isUserSetupCompleted }, login];
};
