import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetch, useReload } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data } }, getUsers] = useFetch(`/api/setup/users`);
  const [{ locationId }, reload] = useReload();
  const [users, setUsers] = useState<any>();

  // load form
  useEffect(() => {
    void (async () => {
      await getUsers();
    })();
  }, [locationId]);

  useEffect(() => {
    if (loading === 'success') {
      setUsers(data);
    }
  }, [loading]);

  const handleReload = () => {
    reload();
  }

  return <div><button type="button" onClick={handleReload}>reload</button>USER <Link to={`new?formId=${route}_${page}`}>Add</Link></div>;
};

export default UserList;