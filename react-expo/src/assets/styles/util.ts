import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const utilStyle = (theme: ThemeData) => {
  const { COLOR } = theme;

  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: COLOR.background,
      barStyle: COLOR.barStyle,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    hide: {
      height: 0,
      width: 0,
      opacity: 0,
      transform: [{ scale: 0 }]
    }
  });

  return {
    'status-bar': styles.statusBar,
    center: styles.center,
    hide: styles.hide
  };
};
