import React from 'react';
import { Button, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';

export enum NavGroup {
  ADMIN = 'admin',
  USER = 'user',
  SOLUTION = 'solution',
  RESOURCE = 'resource'
}

const list = {
  setup: { label: 'setup' },
  config: { label: 'config' }
}

export const Nav: React.FC = React.memo(({ navigation }): JSX.Element | null => {
  const { nav } = useSelector((state: AppState) => state);
  const { modules = list } = nav;

  if (!modules) {
    return <Button title="Setup" onPress={() => navigation.push('Setup')} />;
  }

  return (
    <>
      {
        Object.keys(modules).map((key, i) => {

          const { label, group } = modules[key];

          return (group !== NavGroup.SOLUTION) ? <Text key={label}>{label}</Text> : null
        })
      }
    </>
  )
});