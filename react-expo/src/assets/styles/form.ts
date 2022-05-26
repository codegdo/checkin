import { StyleSheet } from 'react-native';

export const formStyle = (theme) => {

  const styles = StyleSheet.create({
    form: {
      borderWidth: 1,
      borderColor: "thistle",
      borderRadius: 50,
    },
    formHeader: {
      color: 'red',
      fontSize: 20
    }
  });

  return {
    form: styles.form,
    form_text: styles.formHeader
  }
}

