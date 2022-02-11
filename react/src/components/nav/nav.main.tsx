import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { NavModuleGroup } from './nav.type';

export const NavMain: React.FC<{ name: string }> = (props): JSX.Element | null => {
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

          const { label, group } = modules[key];

          return (group == NavModuleGroup.SOLUTION) ? <li key={i}>
            <NavLink to={`/${key}`}>{label}</NavLink>
          </li> : null
        })
      }
    </>
  )
}

/*
 <NavLink to="/" end>Home</NavLink>
      <Link to="/admin" className={`${['admin'].includes(path) ? 'active' : ''}`}>Admin</Link>
      <NavLink to="/auth/login">Login</NavLink>
      <NavLink to="/auth/passcode">Passcode</NavLink>
      <NavLink to="/auth/logout">Logout</NavLink>
*/