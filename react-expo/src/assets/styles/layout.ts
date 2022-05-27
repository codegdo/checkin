import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const layoutStyle = (theme: ThemeData) => {
  const { COLOR, SPACING } = theme;

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: COLOR.background,
      paddingHorizontal: SPACING.small
    },
    container: {
      flex: 1
    },
    containerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  return {
    wrapper: styles.wrapper,
    container: styles.container,
    containerCenter: styles.containerCenter
  }
}
