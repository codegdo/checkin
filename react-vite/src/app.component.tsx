import React, { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';


//import * as styles from './assets/css/theme/_default.scss?inline';

export const App: FC = (): JSX.Element => {
  return <Outlet />
}




//import { AppRoute } from './app.route';
/*
useEffect(() => {
    //const scss = import('./assets/css/index.scss');

    // void (async () => {
    //   const scss: any = (await import('./assets/css/index.scss'));
    //   console.log(scss);
    // })();

    console.log(styles.default);

    //scss.then(data => console.log(data));

  }, []);

  const handleToggle = () => {
    const body = document.querySelector("body");
    body?.toggleAttribute('data-scheme-dark');
  }

  return <div>
    <a href="#">hello</a>
    <button type="button" className="button" onClick={handleToggle}>Toggle</button>
    <button type="button" className="button">Button</button>
    <button type="button" className="button btn-primary">Primary</button>
    <button type="button" className="button btn-secondary">Secondary</button>
    <button type="button" className="button btn-light">Light</button>
    <button type="button" className="button btn-dark">Dark</button>
  </div>;
*/