import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../../../hooks';


const Verify: React.FC = (): JSX.Element => {

  const { token = '' } = useParams();
  const [{ loading, result }, fetchVerify] = useFetch(`/api/auth/verify/${token}`);

  console.log(token);

  useEffect(() => {
    void fetchVerify();
  }, []);

  switch (loading) {
    case 'success':
      return <div>
        success
        <Link to="../login">Login</Link>
      </div>
    case 'error':
      return <div>
        error
        <Link to="../login">Login</Link>
      </div>
    default:
      return <div>loading...</div>
  }
}

export default Verify;