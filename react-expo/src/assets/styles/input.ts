import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const inputStyle = (theme: ThemeData) => {

  const { COLOR, FONT_SIZE } = theme;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: COLOR.onBackground,
      padding: 10,
      fontSize: FONT_SIZE.p
    },
    inputText: {

    }
  });

  return {
    input: styles.input,
    inputText: styles.inputText
  }
}

