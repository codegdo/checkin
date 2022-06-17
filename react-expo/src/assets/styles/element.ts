import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const elementStyle = (theme: ThemeData) => {
  const { COLOR, SIZE, ROUNDING } = theme;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: COLOR.button,

      padding: 15,
      fontSize: SIZE.text,
      alignItems: "center",
      borderRadius: ROUNDING.small,
    },
    buttonText: {
      color: COLOR.overButton,
      textTransform: 'uppercase'
    },
  });

  return {
    button: styles.button,
    'button-text': styles.buttonText,
  };
};
