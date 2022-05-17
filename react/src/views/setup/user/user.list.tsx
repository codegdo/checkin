import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Columns, DataColumn, DataItem, GridView } from '../../../components/gridview';
import { DataQuery } from '../../../components/gridview/gridview.type';

import { useFetch } from '../../../hooks';

type DataSource = {
  users: [];
  columns: [];
  total: number;
}

export type UserData = {
  id: string;
}

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [{ status: loading, response: { data: dataSource } }, getUsers] = useFetch();
  const [data, setData] = useState<DataSource>();
  const [query, setQuery] = useState<string | undefined>();

  // load form
  useEffect(() => {
    (async () => {
      search && await getUsers({ url: `/api/setup/users${search}` });
    })();
  }, [search]);

  useEffect(() => {
    query && navigate(`/setup/users${query}`);
  }, [query]);

  useEffect(() => {
    if (loading === 'success') {
      setData({ ...dataSource });
    }
  }, [loading]);

  const handleCallback = ({ name, search }: DataQuery) => {
    //
    if (name == 'load') {
      setQuery(search)
    } else {
      navigate(`/setup/users${search}`);
    }

  };

  if (!data) {
    //return <div>loading...</div>;
  }

  return <div>
    <header>
      USER <Link to={`new?formId=${route}_${page}`}>Add</Link>
    </header>

    {/* <GridView<UserData> data={data?.users} config={{
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
        <DataColumn name="emailAddress" label="Email Address" type="text" isSearch={true} />
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
    </GridView> */}

    <GridView
      data={data?.users}
      columns={data?.columns}
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
        },
        pagination: {
          total: data?.total,
          limit: 4
        }
      }}
      status={loading}
      onCallback={handleCallback}
    />
  </div>;
};

export default UserList;
