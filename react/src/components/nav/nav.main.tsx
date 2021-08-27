import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const NavMain: React.FC<{ name: string }> = (props): JSX.Element => {
  const path = window.location.pathname.split('/')[1];
  return (
    <div>
      <NavLink to="/" end>Home</NavLink>
      <Link to="/admin" className={`${['admin'].includes(path) ? 'active' : ''}`}>Admin</Link>
      <NavLink to="/auth/login">Login</NavLink>
      <NavLink to="/auth/passcode">Passcode</NavLink>
      <NavLink to="/auth/logout">Logout</NavLink>
    </div>
  )
}