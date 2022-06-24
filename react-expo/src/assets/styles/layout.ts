import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const layoutStyle = (theme: ThemeData) => {
  const { COLOR, SPACING } = theme;

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: COLOR.background,
      paddingHorizontal: SPACING.medium,
    },
    container: {
      flex: 1,
    },
  });

  return {
    wrapper: styles.wrapper,
    container: styles.container,
  };
};
