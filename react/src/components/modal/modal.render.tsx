import React from 'react';
import { ModalFooter } from './modal.footer';
import { ModalHeader } from './modal.header';
import { ModalMain } from './modal.main';

export const ModalRender: React.FC = (): JSX.Element => {
  return <div>
    <ModalHeader />
    <ModalMain />
    <ModalFooter />
  </div>
}