import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const utilStyle = (theme: ThemeData) => {
  const { COLOR } = theme;

  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: COLOR.barBackground,
      barStyle: COLOR.barStyle
    }
  });

  return {
    statusBar: styles.statusBar
  }
}
