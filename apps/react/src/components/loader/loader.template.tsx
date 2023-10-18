import React, { FC, Suspense, useMemo, ReactElement } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { Options, TemplateProps } from './template.type';

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

export function Template(Component: FC<TemplateProps | object>): FC<TemplateProps> {
  return (props: TemplateProps): ReactElement => {
    const options = ({ fallback }: Options): HTMLReactParserOptions => {
      return {
        replace: (domNode): false | void | object | Element | null | undefined => {
          if ('attribs' in domNode) {
            const { attribs } = domNode;

            switch (attribs.id) {
              case 'jsx_main':
                return fallback ? <div>loading</div> : <Component {...props} />;
              case 'jsx_nav':
                return <div>NAV</div>;
              default:
                return null;
            }
          }
        }
      };
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [template, fallback] = useMemo(() => {
      return [parse(html, options({ fallback: false })), parse(html, options({ fallback: true }))];
    }, []);

    return (
      <Suspense fallback={fallback as ReactElement}>
        {template}
      </Suspense>
    );
  };
}
