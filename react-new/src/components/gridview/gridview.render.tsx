import React, { Children, isValidElement, PropsWithChildren, useMemo } from 'react';
import { Footer } from './gridview.footer';
import { Header } from './gridview.header';
import { Main } from './gridview.main';


interface RenderProps {
  data?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ children }): JSX.Element => {

  console.log('CHILDREN', Children.toArray(children));

  const columns = useMemo(() => {
    const cols: any[] = [];

    children && Children.toArray(children).map((child) => {
      if (isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Column') {
        const { props } = child;
        cols.push({ ...props });
      }
    });

    return cols;
  }, []);

  console.log(columns);

  return <>
    <Header />
    <Main />
    <Footer />
  </>
}