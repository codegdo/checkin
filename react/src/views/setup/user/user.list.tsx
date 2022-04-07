import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Column, Control, Gridview, Render } from '../../../components/gridview';

import { useFetch, useReload } from '../../../hooks';

const UserList: React.FC<any> = ({ route, page }): JSX.Element => {

  const [{ status: loading, result: { data: dataSource } }, getUsers] = useFetch(`/api/setup/users`);
  const [{ locationId }, reload] = useReload();
  const [{ users, columns, search }, setData] = useState<any>({});

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

    <Gridview data={users} columns={columns} search={search}>
      <Render>
        <Column name="username" title="Username"></Column>
        <Column name="emailAddress" title="Email Address"></Column>
      </Render>
      <Control />
    </Gridview>

    <Gridview
      data={users}
      columns={columns}
      search={search}
    />

    <table>
      <thead>
        <tr>
          {
            columns && columns.map((c: any, i: any) => {
              return <th key={i}>{c.label}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          users && users.map((item: any, i: any) => {
            return <tr key={i}>
              {
                Object.keys(item).map((key, i) => {
                  return <td key={i}>{String(item[key])}</td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  </div>;
};

export default UserList;
