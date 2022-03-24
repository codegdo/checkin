import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetch } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data } }, getUsers] = useFetch(`/api/setup/users`);
  const [users, setUsers] = useState<any>();

  // load form
  useEffect(() => {
    void (async () => {
      await getUsers();
    })();
  }, []);

  useEffect(() => {
    if (loading === 'success') {
      setUsers(data);
    }
  }, [loading]);

  return <div>USER <Link to={`new?formId=${route}_${page}`}>Add</Link></div>;
};

export default UserList;