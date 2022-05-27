import { layoutStyle } from './layout';
import { formStyle } from './form';
import { inputStyle } from './input';
import { utilStyle } from './util';
import { ThemeData } from './themes';

export const createStyles = (theme: ThemeData) => {

  const layout = layoutStyle(theme);
  const form = formStyle(theme);
  const input = inputStyle(theme);
  const util = utilStyle(theme);

  return {
    ...layout,
    ...form,
    ...input,
    ...util
  }
}