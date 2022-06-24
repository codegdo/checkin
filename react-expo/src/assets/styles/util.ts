import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const utilStyle = (theme: ThemeData) => {
  const { COLOR } = theme;

  const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: COLOR.background,
      barStyle: COLOR.barStyle,
    },
    headerBar: {
      backgroundColor: COLOR.background,
    },
    headerTitle: {

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
    'header-bar': styles.headerBar,
    'header-title': styles.headerTitle,
    center: styles.center,
    hide: styles.hide
  };
};
