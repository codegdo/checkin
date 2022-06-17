import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const inputStyle = (theme: ThemeData) => {
  const { COLOR, SIZE, ROUNDING } = theme;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: COLOR.overBackground,
      padding: 10,
      fontSize: SIZE.text,
      borderRadius: ROUNDING.small,
    },
    label: {},
  });

  return {
    input: styles.input,
    label: styles.label,
  };
};
