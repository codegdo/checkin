import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const formStyle = (theme: ThemeData) => {
  const { COLOR, FONT_SIZE } = theme;
  const styles = StyleSheet.create({
    form: {
      width: "100%",
      //borderWidth: 1,
      //borderColor: COLOR.black,
      //borderRadius: 50,
    },
    formHeader: {
      fontSize: FONT_SIZE.p
    }
  });

  return {
    form: styles.form,
    form_text: styles.formHeader
  }
}

