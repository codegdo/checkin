import { FC, Suspense, useMemo, ReactElement } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { ComponentProps } from './loader.type';

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

interface ParserOptions {
  fallback: boolean;
}

export function LoaderTemplate(Component: FC<ComponentProps>): FC<ComponentProps> {
  return (props: ComponentProps): ReactElement => {
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parserOptions = ({ fallback }: ParserOptions): HTMLReactParserOptions => {
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
      return [
        parse(html, parserOptions({ fallback: false })),
        parse(html, parserOptions({ fallback: true }))
      ];
    }, [parserOptions]);

    return (
      <Suspense fallback={fallback as ReactElement}>
        {template}
      </Suspense>
    );
  };
}
