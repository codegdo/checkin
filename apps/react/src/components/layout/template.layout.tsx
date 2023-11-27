import { FC, Suspense, useMemo, ReactElement } from 'react';
import parse, { HTMLReactParserOptions } from 'html-react-parser';

import { useSelector } from 'react-redux';
import { AppState } from '@/store/reducers';
import { AttributeIds, ComponentProps } from './type';
import { TemplateType, useTemplate } from './hooks/use-template.hook';
import { ButtonLogout, ButtonExit } from '../button';
import { NavMenu, NavSidebar } from '../nav';
import { checkViewModule } from './helper';

interface ParserOptions {
  fallback: boolean;
}

interface TemplateProps {
  routeContext: ComponentProps;
  Component: FC<ComponentProps>;
}

export function Template({ routeContext, Component }: TemplateProps) {
  const {accessType, isAuth} = useSelector((state: AppState) => state.session) as {accessType: TemplateType, isAuth: boolean};
  const theme = useSelector((state: AppState) => state.theme);
  const model = useSelector((state: AppState) => (accessType === 'system' ? state.model.sys : state.model.app));
  const template = useTemplate(accessType, routeContext, theme);

  const isViewFound = !isAuth || checkViewModule(routeContext, model?.views);

  const getParserOptions = ({ fallback }: ParserOptions): HTMLReactParserOptions => {
    return {
      replace: (domNode): false | void | object | Element | null | undefined => {
        if ('attribs' in domNode) {
          const { attribs } = domNode;

          switch (attribs.id) {
            case AttributeIds.MAIN:
              return fallback ? <div>loading</div> : isViewFound ? <Component {...routeContext} /> : <div>notfound</div>;
            case AttributeIds.MENU:
              return <div>
                <NavMenu {...model} />
                <ButtonExit />
                <ButtonLogout />
              </div>;
            case AttributeIds.SIDEBAR:
              return <div>
                <NavSidebar module={routeContext?.module} {...model}/> 
              </div>;
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
