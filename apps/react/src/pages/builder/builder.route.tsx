import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";
import { FormProviderApi } from "./form/form.provider";

const Index = LoaderTemplate(lazy(() => import('./builder.index')));
const EmailList = LoaderTemplate(lazy(() => import('./email/email.list')));
const EmailBuilder = LoaderTemplate(lazy(() => import('./email/email.builder')));
const FormList = LoaderTemplate(lazy(() => import('./form/form.list')));
const FormBuilder = LoaderTemplate(lazy(() => import('./form/form.builder')));
const TemplateList = LoaderTemplate(lazy(() => import('./template/template.list')));
const TemplateBuilder = LoaderTemplate(lazy(() => import('./template/template.builder')));

function BuilderRoute() {

  const routes = useRoutes([
    {
      path: '/emails',
      element: <EmailList module="builder" view="emails" />
    },
    {
      path: '/emails/:id',
      element: <EmailBuilder module="builder" view="emails" />
    },
    {
      path: '/forms',
      element: <FormProviderApi><FormList module="builder" view="forms" /></FormProviderApi>
    },
    {
      path: '/forms/:id',
      element: <FormProviderApi><FormBuilder module="builder" view="forms" /></FormProviderApi>
    },
    {
      path: '/templates',
      element: <TemplateList module="builder" view="templates" />
    },
    {
      path: '/templates/:id',
      element: <TemplateBuilder module="builder" view="templates" />
    },
    {
      path: '/',
      element: <Index module="builder" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default BuilderRoute;
