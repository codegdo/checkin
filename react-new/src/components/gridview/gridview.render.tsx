import React, { Children, isValidElement, PropsWithChildren, useMemo } from 'react';
import { Footer } from './gridview.footer';
import { Header } from './gridview.header';
import { Main } from './gridview.main';


interface RenderProps {
  columns?: any[]
}

export const Render: React.FC<PropsWithChildren<RenderProps>> = ({ children }): JSX.Element => {

  const columns = useMemo(() => {
    const cols: any[] = [];

    children && Children.toArray(children).map((child) => {
      if (isValidElement(child) && typeof child.type !== 'string' && child.type.name == 'Column') {
        const { props } = child;

        if (props.children) {

        }

        cols.push({ ...props });
      }
    });

    return cols;
  }, []);

  return <>
    <Header columns={columns} />
    <Main columns={columns} />
    <Footer />
  </>
}