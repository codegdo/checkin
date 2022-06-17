import { layoutStyle } from './layout';
import { formStyle } from './form';
import { inputStyle } from './input';
import { elementStyle } from './element';
import { utilStyle } from './util';
import { ThemeData } from './themes';

export const createStyles = (theme: ThemeData) => {

  const layout = layoutStyle(theme);
  const form = formStyle(theme);
  const input = inputStyle(theme);
  const element = elementStyle(theme);
  const util = utilStyle(theme);

  return {
    ...layout,
    ...form,
    ...input,
    ...element,
    ...util
  }
}