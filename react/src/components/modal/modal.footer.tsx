import React, { useContext } from 'react';
import { ModalContext } from './modal.component';

export const ModalFooter: React.FC = (): JSX.Element => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Require MODAL FOOTER Nested In MODAL CONTEXT');
  }

  const { handleClick } = context;


  return <footer>
    <button type="button" onClick={() => handleClick('')}>Click</button>
  </footer>
}