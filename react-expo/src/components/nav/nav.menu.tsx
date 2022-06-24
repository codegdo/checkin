import React from 'react';
import { Button, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducers';
import { Container } from '../container/container.component';

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

export const NavMenu: React.FC = React.memo(({ navigation }): JSX.Element | null => {
  const { nav } = useSelector((state: AppState) => state);
  const { modules = list } = nav;

  if (!modules) {
    return <Button title="Setup" onPress={() => navigation.push('setup')} />;
  }

  return (
    <Container>
      {
        Object.keys(modules).map((key, i) => {

          const { label, group } = modules[key];

          return (group !== NavGroup.SOLUTION) ?
            <TouchableOpacity onPress={() => navigation.push(label)} key={label}>
              <Text>{label}</Text>
            </TouchableOpacity> : null
        })
      }
    </Container>
  )
});