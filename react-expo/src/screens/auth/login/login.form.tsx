import React, { useContext, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import * as data from './login.json';
import { Form } from '../../../components';
import { ThemeContext } from '../../../contexts/theme.context';
import { darkTheme, lightTheme } from '../../../assets/styles/themes';

export const LoginForm: React.FC = () => {
  const { styles: { wrapper, containerCenter }, setTheme } = useContext(ThemeContext);
  const [form, setForm] = useState<any>();

  // load form
  useEffect(() => {
    setForm(data);
  }, []);

  const handleLight = () => {
    setTheme(lightTheme);
  }

  const handleDark = () => {
    setTheme(darkTheme);
  }

  return <SafeAreaView style={wrapper}>
    <View style={containerCenter}>
      <Form />
      <Button title="Light" onPress={handleLight} />
      <Button title="Dark" onPress={handleDark} />
    </View>
  </SafeAreaView>
}