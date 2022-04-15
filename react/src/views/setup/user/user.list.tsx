import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Column, Control, Field, GridView, Render } from '../../../components/gridview';
import { BoundLink, Columns, Data, DataBound, GridView } from '../../../components/gridview';
import { useFetch, useReload } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch(`/api/setup/users`);
  const [{ locationId }, reload] = useReload();
  const [{ config, columns, fields, users }, setData] = useState<any>({});

  // load form
  useEffect(() => {
    void (async () => {
      await getUsers();
    })();
  }, [locationId]);

  useEffect(() => {
    if (loading === 'success') {
      setData({ ...dataSource });
    }
  }, [loading]);

  const handleReload = () => {
    reload();
  }

  return <div>
    <header>
      USER <Link to={`new?formId=${route}_${page}`}>Add</Link> <button type="button" onClick={handleReload}>reload</button>
    </header>

    <GridView data={users}>
      <Columns>
        <Data name="username" label="Username" type="text" isDefault={true} isSearch={true} />
        <Data name="emailAddress" label="Email Address" type="text" />
        <DataBound label="edit">
          <BoundLink name="edit" label="edit" param="id" query="formId=setup_users" />
        </DataBound>
      </Columns>
    </GridView>

    <GridView
      data={users}
      columns={columns}
      controls={{}}
    />
  </div>;
};

export default UserList;
