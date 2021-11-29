import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const logos = [
  require('./images/swm-1.png'),
  require('./images/swm-2.png'),
  require('./images/swm-3.png'),
  require('./images/swm-4.png'),
]

export default function App() {
  const [idx, setIdx] = useState(0);

  const handlePress = () => {
    setIdx((idx + 1) % logos.length);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={logos[idx]} style={styles.image} />
      </TouchableOpacity>
      <StatusBar style="auto" />
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
  image: {
    width: 200,
    resizeMode: 'contain',
  }
});
