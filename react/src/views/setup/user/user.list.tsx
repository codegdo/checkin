import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Columns, DataColumn, DataItem, GridView } from '../../../components/gridview';

import { useFetch, useReload } from '../../../hooks';

type DataSource = {
  users: [],
  columns: []
}

export type UserData = {
  id: string;
}

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {
  const { search } = useLocation();

  console.log(location);
  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch(`/api/setup/users${search}`);
  const [{ locationId }, reload] = useReload();
  const [data, setData] = useState<DataSource>();

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

  const handleSearch = () => { }

  const handleCallback = () => {

    console.log('click');
  }

  if (!data) {
    return <div>loading...</div>;
  }

  return <div>
    <header>
      USER <Link to={`new?formId=${route}_${page}`}>Add</Link> <button type="button" onClick={handleReload}>reload</button>
    </header>

    <GridView<UserData> data={data.users} config={{
      customs: {
        id: {
          type: "link",
          data: {
            path: null,
            param: "id",
            query: "formId=setup_users"
          }
        }
      }
    }}>
      <Columns>
        <DataColumn name="id" label="Id" type="text" isKey={true} />
        <DataColumn name="username" label="Username" type="text" isPrimary={true} isSearch={true} />
        <DataColumn name="emailAddress" label="Email Address" type="text" />
        <DataColumn name="action" label="Action">
          <DataItem name="edit" label="Edit" type="link" data={
            {
              path: null,
              param: "id",
              query: "formId=setup_users"
            }
          } />
        </DataColumn>
      </Columns>
    </GridView>

    <GridView
      data={data.users}
      columns={data.columns}
      config={{
        columns: [{
          label: "Action",
          data: [{
            name: "edit",
            label: "Edit",
            type: "link",
            data: {
              path: null,
              param: "id",
              query: "formId=setup_users"
            }
          }]
        }],
        customs: {
          id: {
            type: "link",
            data: {
              path: null,
              param: "id",
              query: "formId=setup_users"
            }
          }
        }
      }}
      onSearch={handleSearch}
      onCallback={handleCallback}
    />
  </div>;
};

export default UserList;
