import React from 'react';
import ReactDOM from 'react-dom';
import { ModalRender as render } from './modal.render';

import { ModalContextProps, ModalProps } from './modal.type';

export const ModalContext = React.createContext<ModalContextProps>(undefined);

export const Modal: React.FC<ModalProps> = ({ show, onModal, children, ...props }): JSX.Element | null => {

  const handleClick = (name: string) => {
    alert();
  }

  return (
    <ModalContext.Provider value={{ handleClick }}>
      {
        show ? ReactDOM.createPortal(children || render(props), document.body) : null
      }
    </ModalContext.Provider>
  )
}