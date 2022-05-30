import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const inputStyle = (theme: ThemeData) => {
  const { COLOR, SIZE, ROUNDING } = theme;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: COLOR.onBackground,
      padding: 10,
      fontSize: SIZE.input,
      borderRadius: ROUNDING.input,
    },
    label: {},
  });

  return {
    input: styles.input,
    label: styles.label,
  };
};
