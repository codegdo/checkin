import React, { useContext, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import * as data from './login.json';
import { Form } from '../../../components';
import { ThemeContext } from '../../../contexts/theme.context';
import { darkTheme, lightTheme } from '../../../assets/styles/themes';
import { Block } from '../../../components/form/form.block';
import { Field } from '../../../components/form/form.field';
import { cssStyle } from '../../../utils';

export const LoginForm: React.FC = () => {
  const { styles, setTheme } = useContext(ThemeContext);
  const wrapper = cssStyle('wrapper', styles);
  const container = cssStyle('container center', styles);
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
    <View style={container}>

      <Form>
        <Block>
          <Field
            id="1"
            type="email"
            name="username"
            placeholder="Username"
          />
          <Field
            id="2"
            type="password"
            name="password"
            placeholder="Password"
          />
        </Block>
      </Form>

      <Button title="Light" onPress={handleLight} />
      <Button title="Dark" onPress={handleDark} />
    </View>
  </SafeAreaView>
}