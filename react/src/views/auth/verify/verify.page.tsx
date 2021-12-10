import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks';
import { AppState } from '../../../store/reducers';


const Verify: React.FC = (): JSX.Element => {
  const { loggedIn, orgId, user } = useSelector((state: AppState) => state.session);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('../login');
    }
  }, []);



  return <div>Verify <Link to="../logout">Cancel</Link></div>

}

export default Verify;