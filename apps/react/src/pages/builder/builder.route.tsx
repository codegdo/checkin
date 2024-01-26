import { lazy } from "react";
import { useRoutes } from "react-router-dom";

import { LoaderTemplate } from "@/components";
import { FormApi } from "./form/form.api";

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
      element: <FormApi><FormList module="builder" view="forms" /></FormApi>
    },
    {
      path: '/forms/:id',
      element: <FormApi><FormBuilder module="builder" view="forms" /></FormApi>
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
