
import React, { createElement, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { AppState } from './store/reducers';
//import { useAction } from './hooks';

// eslint import/no-webpack-loader-syntax: off
// import css from '!css-loader!postcss-loader!sass-loader!./assets/css/root.scss';


// eslint-disable-next-line @typescript-eslint/no-var-requires
//const css = require('!css-loader!postcss-loader!sass-loader!./assets/css/theme.scss')?.default?.toString();

export const Theme: FC = (): React.ReactPortal => {

  const theme = useSelector((state: AppState) => state.theme);
  //const { updateLayout, getLayoutAsync, getThemeAsync } = useAction();

  useEffect(() => {
    //console.log(css);
    //void (async () => {
    //const css = (await require('!css-loader!postcss-loader!sass-loader!./assets/css/theme.scss')).default;
    //console.log(css.toString());
    //setForm(json);
    //})();
    //console.log(css.default.toString());
    //getLayoutAsync();
    //getThemeAsync();
  }, []);

  return createPortal(
    createElement('style', { id: 'theme' }, `${theme[theme.mode]}`),
    document.head
  );
}