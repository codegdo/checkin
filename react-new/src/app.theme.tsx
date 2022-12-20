import React, { createElement, FC } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { AppState } from './store/reducers';

export const Theme: FC = (): JSX.Element => {

  const theme = useSelector((state: AppState) => state.theme);

  return createPortal(
    createElement('style', { id: 'theme' }, `:root{${theme[theme.mode]}}`),
    document.head
  );
}