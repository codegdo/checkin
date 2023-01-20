
import React, { createElement, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { AppState } from './store/reducers';

// eslint import/no-webpack-loader-syntax: off
// import css from '!css-loader!postcss-loader!sass-loader!./assets/css/root.scss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const css = require('!css-loader!postcss-loader!sass-loader!./assets/css/root.scss');

export const Theme: FC = (): React.ReactPortal => {

  const theme = useSelector((state: AppState) => state.theme);

  useEffect(() => {
    console.log(css.default.toString());
  }, []);

  return createPortal(
    createElement('style', { id: 'theme' }, `:root{${theme[theme.mode]}}`),
    document.head
  );
}