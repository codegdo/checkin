import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";

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
      element: <EmailList module="builder" view="email" />
    },
    {
      path: '/emails/:id',
      element: <EmailBuilder module="builder" view="email" />
    },
    {
      path: '/forms',
      element: <FormList module="builder" view="form" />
    },
    {
      path: '/forms/:id',
      element: <FormBuilder module="builder" view="form" />
    },
    {
      path: '/templates',
      element: <TemplateList module="builder" view="template" />
    },
    {
      path: '/templates/:id',
      element: <TemplateBuilder module="builder" view="template" />
    },
    {
      path: '/',
      element: <Index module="dashboard" view="index" />
    },
    {
      path: '*',
      element: <div>not found home</div>
    }
  ]);

  return routes;
}

export default BuilderRoute;
