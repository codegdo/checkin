import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';

export const NavSub: React.FC = React.memo((): JSX.Element | null => {
  const { nav } = useSelector((state: AppState) => state);
  const { views } = nav;

  const root = window.location.pathname.split('/')[1];

  if (!views) {
    return null;
  }

  const view = views[root];

  return (
    <>
      {
        view && Object.keys(view).map(key => {
          const { title } = view[key];

          return <li key={key}>
            {<NavLink to={`/${root}/${key}`}>{title}</NavLink>}
          </li>

        })
      }
    </>
  )
});