import { useContext } from 'react';
import { ViewStyle } from 'react-native';
import { ThemeContext } from '../contexts/theme.context';
import { cssStyle } from '../utils';

export const useStyle = (className: string): [ViewStyle, string] => {
  const { styles } = useContext(ThemeContext);
  const [first, ...rest] = className.split('.');
  const style: ViewStyle = cssStyle(first.trim(), styles);
  const classNames = rest.join('.').trim();

  return [style, classNames];
};
