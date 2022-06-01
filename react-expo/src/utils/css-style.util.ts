import { StylesType } from '../contexts/theme.context';

export const cssStyle = (className: string, styles: StylesType) => {
  const list = className.split(' ');

  return list.reduce((style, key) => {
    return { ...style, ...(styles as any)[key] };
  }, {});
};
