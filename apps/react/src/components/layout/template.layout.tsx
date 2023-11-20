import { FC, Suspense, useMemo, ReactElement } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

import { useSelector } from 'react-redux';
import { AppState } from '@/store/reducers';
import { AttributeIds, ComponentProps } from './type';
import { TemplateType, useTemplate } from './hooks/use-template.hook';
import { ButtonLogout } from '../button/button.logout';

interface ParserOptions {
  fallback: boolean;
}

interface TemplateProps {
  templateProps: ComponentProps;
  Component: FC<ComponentProps>;
}

export function Template({ templateProps, Component }: TemplateProps) {
  const { accessType } = useSelector((state: AppState) => state.session);
  const theme = useSelector((state: AppState) => state.theme);
  const themeType = accessType as TemplateType;

  const template = useTemplate(themeType, templateProps, theme);

  console.log('TEMPLATE', template);

  const getParserOptions = ({ fallback }: ParserOptions): HTMLReactParserOptions => {
    return {
      replace: (domNode): false | void | object | Element | null | undefined => {
        if ('attribs' in domNode) {
          const { attribs } = domNode;

          switch (attribs.id) {
            case AttributeIds.MAIN:
              return fallback ? <div>loading</div> : <Component {...templateProps} />;
            case AttributeIds.NAV:
              return <div>NAV <ButtonLogout /></div>;
            default:
              return null;
          }
        }
      }
    };
  };

  const [content, fallback] = useMemo(() => {
    return [
      parse(template, getParserOptions({ fallback: false })),
      parse(template, getParserOptions({ fallback: true }))
    ];
  }, []);

  return (
    <Suspense fallback={fallback as ReactElement}>
      {content}
    </Suspense>
  );
}
