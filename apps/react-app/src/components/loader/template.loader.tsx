import { FC, Suspense, useMemo } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { Options, TemplateProps } from './types';

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

function Template(Component: FC<TemplateProps | object>) {

  return function TemplateLoader(props: TemplateProps) {
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

    const [template, fallback] = useMemo(() => {
      return [parse(html, options({ fallback: false })), parse(html, options({ fallback: true }))];
    }, []);

    return (
      <Suspense fallback={fallback}>
        {template}
      </Suspense>
    );
  };
}

export default Template;
