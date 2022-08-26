import React, { useEffect, useState } from 'react';
import { Column } from '../../../components/gridview/gridview.column';
import { GridView } from '../../../components/gridview/gridview.component';

type Users = {
  username: string,
  email: string
}

const users: Array<Users> = [
  {
    username: 'john',
    email: 'john@gmail.com'
  },
  {
    username: 'linda',
    email: 'linda@gmail.com'
  }
];

const User = (): JSX.Element => {

  useState();

  //useFetch();

  useEffect(() => {
    // fetch
  }, []);

  return <>
    <GridView<Users> data={users}>
      <Column name="username" />
      <Column name="email" />
    </GridView>
  </>
}

export default User;
