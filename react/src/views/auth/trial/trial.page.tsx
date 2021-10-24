import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

//import { useAction, useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';

const Trial: React.FC = (): JSX.Element => {
  const { loggedIn, orgId } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !orgId) {
      navigate('/');
    }
  }, [loggedIn, orgId]);

  return <div>Trial <Link to="../logout">Logout</Link></div>
}

export default Trial;