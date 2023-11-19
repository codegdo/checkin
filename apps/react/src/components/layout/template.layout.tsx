import { FC, Suspense, useMemo, ReactElement } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';

export interface TemplateProps {
  module: string;
  view?: string;
  object?: string;
}

interface ParserOptions {
  fallback: boolean;
}

interface TemplateLayoutProps {
  templateProps: TemplateProps;
  Component: FC<TemplateProps>;
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

export function TemplateLayout({ templateProps, Component }: TemplateLayoutProps) {

  const getParserOptions = ({ fallback }: ParserOptions): HTMLReactParserOptions => {
    return {
      replace: (domNode): false | void | object | Element | null | undefined => {
        if ('attribs' in domNode) {
          const { attribs } = domNode;

          switch (attribs.id) {
            case 'jsx_main':
              return fallback ? <div>loading</div> : <Component {...templateProps} />;
            case 'jsx_nav':
              return <div>NAV</div>;
            default:
              return null;
          }
        }
      }
    };
  };

  const [template, fallback] = useMemo(() => {
    return [
      parse(html, getParserOptions({ fallback: false })),
      parse(html, getParserOptions({ fallback: true }))
    ];
  }, []);

  return (
    <Suspense fallback={fallback as ReactElement}>
      {template}
    </Suspense>
  );
}
