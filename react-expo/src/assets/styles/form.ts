import { StyleSheet } from 'react-native';
import { ThemeData } from './themes';

export const formStyle = (theme: ThemeData) => {
  const { COLOR, SIZE } = theme;
  const styles = StyleSheet.create({
    form: {
      width: '100%',
    },
    formHeader: {
      fontSize: SIZE.h1,
    },
    formMain: {},
    formFooter: {},
    formBlock: {},
    formField: {},
  });

  return {
    form: styles.form,
    'form-header': styles.formHeader,
    'form-block': styles.formBlock,
    'form-field': styles.formField,
  };
};
