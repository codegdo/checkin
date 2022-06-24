import React from 'react';
import { Button, Text, View } from 'react-native';

export const CalendarIndex: React.FC = ({ navigation }) => {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Calendar Overview</Text>
    <Button
      onPress={() => navigation.navigate('calendar-modal')}
      title="Open Modal"
    />
  </View>
}