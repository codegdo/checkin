import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { NavModuleGroup } from './nav.type';

export const NavProfile: React.FC<{ name: string }> = (props): JSX.Element | null => {
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

          return (group !== NavModuleGroup.SOLUTION) ? <li key={i}>
            <NavLink to={`/${key}`}>{label}</NavLink>
          </li> : null
        })
      }
    </>
  )
}