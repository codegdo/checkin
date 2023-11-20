import DOMPurify from 'dompurify';
import { ThemeLayout, ThemeType } from '@/store/types';
import { TemplateProps } from '../template.layout';

import { baseSystem } from './system/base';
import { baseInternal } from './internal/base';
import { baseExternal } from './external/base';
import { basePublic } from './public/base';

export type TypeLayout = ThemeType;

const themeDefault: ThemeLayout = {
  system: {
    base: baseSystem,
  },
  internal: {
    base: baseInternal,
  },
  external: {
    base: baseExternal,
  },
  public: {
    base: basePublic,
  },
};

export const useLayout = (type: TypeLayout, route:TemplateProps , theme: Partial<ThemeLayout> = {}) => {
  const baseTemplate = theme[type]?.base || themeDefault[type]?.base;
  const {module, view } = route;

  const custom = `${module}_${view}`;

  console.log(custom);

  const template = baseTemplate || '';

  return DOMPurify.sanitize(template);
};
