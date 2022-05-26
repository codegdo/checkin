import { formStyle } from './form';

export const createStyles = (theme) => {

  const form = formStyle(theme);

  return {
    ...form
  }
}