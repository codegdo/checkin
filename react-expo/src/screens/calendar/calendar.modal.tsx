import React from 'react';
import { Button, Text, View } from 'react-native';

export const CalendarModal: React.FC = ({ navigation }) => {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Modal</Text>
    <Button onPress={() => navigation.goBack()} title="Dismiss" />
  </View>
}