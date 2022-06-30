import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { NavGroup } from './nav.type';

export const NavMain: React.FC = React.memo((): JSX.Element | null => {
  const { nav } = useSelector((state: AppState) => state);
  const { modules } = nav;

  const path = window.location.pathname.split('/')[1];

  if (!modules) {
    return null;
  }

  return (
    <>
      {
        Object.keys(modules).map((key, i) => {

          const { title, group } = modules[key];

          return (group == NavGroup.SOLUTION) ? <li key={i}>
            <NavLink to={`/${key}`}>{title}</NavLink>
          </li> : null
        })
      }
    </>
  )
});

/*
 <NavLink to="/" end>Home</NavLink>
      <Link to="/admin" className={`${['admin'].includes(path) ? 'active' : ''}`}>Admin</Link>
      <NavLink to="/auth/login">Login</NavLink>
      <NavLink to="/auth/passcode">Passcode</NavLink>
      <NavLink to="/auth/logout">Logout</NavLink>
*/