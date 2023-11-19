import { FC } from 'react';
import { TemplateLayout, TemplateProps } from '../layout/template.layout';

export const LoaderTemplate = (Component: FC<TemplateProps>) => (props: TemplateProps) => (
  <TemplateLayout templateProps={props} Component={Component} />
);

