import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Timer } from './components/timer/timer.component';

export default function App() {
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       username: 'gdo',
  //       password: '123456'
  //     })
  //   }).then((response) => response.json())
  //     .then((res) => {
  //       alert("Login success");
  //     })
  //     .catch(e => alert("Error"));
  // }, []);

  // const handlePress = () => {
  //   fetch('http://localhost:5000/api/auth/logout', {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // }

  return (
    <View style={styles.container}>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
