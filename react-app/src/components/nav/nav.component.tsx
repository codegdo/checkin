import React from 'react';
import { Link } from 'react-router-dom';

export function Nav() {
  return <></>;
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/iam">Iam</Link>
    <Link to="/iam/users">Users</Link>
    <Link to="/auth/logout">Logout</Link>
  </nav>
}