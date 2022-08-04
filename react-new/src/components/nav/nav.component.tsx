import React from 'react';
import { Link } from 'react-router-dom';

export const Nav: React.FC<any> = (): JSX.Element => {
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/setup">Setup</Link>
    <Link to="/auth/logout">Logout</Link>
  </nav>
}