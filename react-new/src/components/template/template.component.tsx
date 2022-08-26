import React, { ComponentType, lazy, Suspense, useEffect, useMemo } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { Nav } from '../nav/nav.component';

export type TemplateProps = {
  route?: string;
  page: string;
}

export const lazyload = <T extends ComponentType<{}>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 0): React.LazyExoticComponent<T> => {
  return lazy(() => {
    return Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports);
  });
}

const html = DOMPurify.sanitize(`
  <div>
    <header>
      <jsx id="jsx_nav"></jsx>
    </header>
    <main>
      <jsx id="jsx_main"></jsx>
    </main>
  </div>
`, { ADD_TAGS: ['jsx'] });

interface Options {
  fallback: boolean;
}

export const Template = (Component: React.FC<TemplateProps | {}>) => (props: TemplateProps): JSX.Element => {

  const options = ({ fallback }: Options): HTMLReactParserOptions => {
    return {
      replace: (domNode): any => {

        if ('attribs' in domNode) {
          const { attribs } = domNode;

          switch (attribs.id) {
            case 'jsx_main':
              return fallback ? <div>loading</div> : <Component {...props} />
            case 'jsx_nav':
              return <Nav {...props} />
            default:
              return;
          }
        }
      }
    }
  };

  const [template, fallback] = useMemo(() => {
    return [parse(html, options({ fallback: false })), parse(html, options({ fallback: true }))];
  }, []);

  return <Suspense fallback={fallback}>
    {template}
  </Suspense>
}