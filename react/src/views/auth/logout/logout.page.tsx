import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { RedirectState, RedirectTypeEnum, useLogout } from '../../../hooks';
import { AppState } from '../../../store/reducers';
import { returnTypeAssertion } from '../../../utils';

type StateAssertionType = RedirectState;

const Logout: React.FC = (): JSX.Element => {
  const { session: { user } } = useSelector((state: AppState) => state);
  const { state } = useLocation();

  const navigate = useNavigate();
  const [_, logout] = useLogout();

  let _state: StateAssertionType = null;

  if (state) {
    const assertionState = returnTypeAssertion<StateAssertionType>(state as StateAssertionType);
    const stateTypeEnum = { ...RedirectTypeEnum };

    switch (assertionState?.type) {
      case stateTypeEnum.SessionTimeout:
        _state = { ...assertionState };
        break;
    }
  }

  useEffect(() => {
    logout();
    !user && navigate('/auth/login', { state: _state });
  }, [user]);

  return <div>logout...</div>;
};

export default Logout;