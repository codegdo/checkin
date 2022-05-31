import { StylesType } from '../contexts/theme.context';
import { isJsonString } from './is-json-string.util';

export const cssStyle = (className: string, styles: StylesType) => {

  console.log(isJsonString(className));

  const list = className.split(' ');

  return list.reduce((style, key) => {
    return { ...style, ...(styles as any)[key] };
  }, {});
};
