import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import { Column, Control, Field, GridView, Render } from '../../../components/gridview';
import { Columns, DataColumn, DataBound, DataItem, GridView } from '../../../components/gridview';
import { useFetch, useReload } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch(`/api/setup/users`);
  const [{ locationId }, reload] = useReload();
  const [data, setData] = useState<any>();

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

    <GridView data={data.users} customColumns={{
      type: "link",
      param: "id",
      query: "formId=setup_users"
    }}>
      <Columns>
        <DataColumn name="id" label="Id" type="text" isKey={true} />
        <DataColumn name="username" label="Username" type="text" isPrimary={true} isSearch={true} />
        <DataColumn name="emailAddress" label="Email Address" type="text" />
        <DataBound label="Action">
          <DataItem name="edit" label="Edit" type="link" data={
            {
              path: null,
              param: "id",
              query: "formId=setup_users"
            }
          } />
        </DataBound>
      </Columns>
    </GridView>

    <GridView
      data={data.users}
      columns={data.columns}
      boundColumns={[{
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
      }]}
      customColumns={{
        id: {
          type: "checkbox",
          name: "check",
          data: {
            path: null,
            param: "id",
            query: "formId=setup_users"
          }
        }
      }}
      onSearch={handleSearch}
      onCallback={handleCallback}
    />
  </div>;
};

export default UserList;
