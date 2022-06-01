import { StylesType } from '../contexts/theme.context';
import { cssStyle } from '../utils';

export const useStyle = (className: string, styles: StylesType) => {
  const classNames = className.split(':');

  return classNames.reduce((list: any, key) => {
    const style = cssStyle(key, styles);
    return [...list, style];
  }, []);
};
