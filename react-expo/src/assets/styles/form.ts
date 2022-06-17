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
      paddingVertical: 10
    },
    formMain: {
      paddingVertical: 10
    },
    formFooter: {
      paddingVertical: 10
    },
    Block: {},
    Field: {
      marginBottom: 15
    },
  });

  return {
    form: styles.form,
    'form-header': styles.formHeader,
    'form-main': styles.formMain,
    'form-footer': styles.formFooter,
    block: styles.Block,
    field: styles.Field,
  };
};
