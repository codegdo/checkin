'use client'
import React, { createContext } from 'react';
import Layout, { LayoutParams } from './layout';
import { Provider } from 'react-redux';
import { store } from '@/store/configure.store';

export const LayoutContext = createContext({});

const layoutTemplate = (
  Component: React.ComponentType<any>,
  params: LayoutParams
): React.FC => {
  const WrappedComponent: React.FC = (props) => {
    //console.log(metadata)

    return (
      <Provider store={store}>
        <LayoutContext.Provider value={{ hello: 'world' }}>
          <Layout params={params}>
            <Component {...props} />
          </Layout>
        </LayoutContext.Provider>
      </Provider>
    )
  };

  return WrappedComponent;
};

export default layoutTemplate;