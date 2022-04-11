import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column, Control, Field, Gridview, Render } from '../../../components/gridview';

import { useFetch, useReload } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch(`/api/setup/users`);
  const [{ locationId }, reload] = useReload();
  const [{ grid, columns, fields, users }, setData] = useState<any>({});

  // load form
  useEffect(() => {
    void (async () => {
      await getUsers();
    })();
  }, [locationId]);

  useEffect(() => {
    if (loading === 'success') {
      setData(dataSource);
    }
  }, [loading]);

  const handleReload = () => {
    reload();
  }

  return <div>
    <header>
      USER <Link to={`new?formId=${route}_${page}`}>Add</Link> <button type="button" onClick={handleReload}>reload</button>
    </header>

    <Gridview data={users} columns={columns} fields={fields}>
      <Render>
        <Column name="username" title="Username" />
        <Column name="emailAddress" title="Email Address" />
      </Render>
      <Control>
        <Field name="username" />
      </Control>
    </Gridview>

    <Gridview
      data={users}
      columns={columns}
      fields={fields}
    />
  </div>;
};

export default UserList;
