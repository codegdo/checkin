import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { NavGroup } from './nav.type';

export const NavProfile: React.FC = React.memo((): JSX.Element | null => {
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

          return (group !== NavGroup.SOLUTION) ? <li key={i}>
            <NavLink to={`/${key}`}>{label}</NavLink>
          </li> : null
        })
      }
      <NavLink to={`/auth/logout`}>logout</NavLink>
    </>
  )
});