import DOMPurify from 'dompurify';
import { ThemeTemplate, ThemeType } from '@/store/types';

import { systemBase } from './system';
import { internalBase } from './internal';
import { externalBase } from './external';
import { publicBase } from './public';
import { ComponentProps } from '../type';

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

export const useTemplate = (type: TemplateType, routeContext: ComponentProps, theme: Partial<ThemeTemplate> = {}) => {
  const customTheme = theme[type] || {};
  const defaultTheme = defaultThemeTemplate[type] || {};
  const baseTemplate = customTheme.base || defaultTheme.base;
  const viewTemplateType = `${routeContext?.module}_${routeContext?.view}`;
  const selectedTemplate = customTheme?.[viewTemplateType] || defaultTheme?.[viewTemplateType] || baseTemplate;

  return DOMPurify.sanitize(selectedTemplate);
};
