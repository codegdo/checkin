import DOMPurify from 'dompurify';
import { ThemeTemplate, ThemeType } from '@/store/types';
import { TemplateProps } from '../template.layout';

import { systemBase } from './system';
import { internalBase } from './internal';
import { externalBase } from './external';
import { publicBase } from './public';

export type TemplateType = ThemeType;

const defaultThemeTemplate: ThemeTemplate = {
  system: {
    base: systemBase,
  },
  internal: {
    base: internalBase,
  },
  external: {
    base: externalBase,
  },
  public: {
    base: publicBase,
  },
};

export const useTemplate = (type: TemplateType, route: TemplateProps, theme: Partial<ThemeTemplate> = {}) => {
  const customTheme = theme[type] || {};
  const defaultTheme = defaultThemeTemplate[type] || {};
  const baseTemplate = customTheme.base || defaultTheme.base;
  const viewType = `${route.module}_${route.view}`;
  const selectedTemplate = customTheme?.[viewType] || defaultTheme?.[viewType] || baseTemplate;

  return DOMPurify.sanitize(selectedTemplate);
};
