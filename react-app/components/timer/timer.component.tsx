import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

export const Timer: React.FC = (): JSX.Element => {

  const handlePress = () => { }

  return <View style={styles.timer}>
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>Start</Text>
    </TouchableOpacity>
  </View>
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  timer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    borderWidth: 10,
    borderColor: '#CCCCCC',
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 45,
    color: '#CCCCCC'
  }
});