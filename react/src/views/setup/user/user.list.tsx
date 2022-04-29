import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Columns, DataColumn, DataItem, GridView } from '../../../components/gridview';
import { DataQuery } from '../../../components/gridview/gridview.type';

import { useFetch } from '../../../hooks';

type DataSource = {
  users: [],
  columns: []
}

export type UserData = {
  id: string;
}

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch();
  const [data, setData] = useState<DataSource>();

  // load form
  useEffect(() => {
    (async () => {
      await getUsers({ url: `/api/setup/users${search}` });
    })();
  }, [search]);

  useEffect(() => {
    if (loading === 'success') {
      setData({ ...dataSource });
    }
  }, [loading]);

  const handleCallback = useCallback(async ({ name, search }: DataQuery) => {
    if (name == 'search') {
      navigate(`/setup/users${search}`);
    } else {
      navigate(`/setup/users${search}`);
    }
  }, []);

  if (!data) {
    return <div>loading...</div>;
  }

  return <div>
    <header>
      USER <Link to={`new?formId=${route}_${page}`}>Add</Link>
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
    }}
      status={loading}
      onCallback={handleCallback}>
      <Columns>
        <DataColumn name="id" label="Id" type="text" isKey={true} />
        <DataColumn name="username" label="Username" type="text" isDefault={true} isSearch={true} />
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
      status={loading}
      onCallback={handleCallback}
    />
  </div>;
};

export default UserList;
