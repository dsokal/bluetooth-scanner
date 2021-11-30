import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const logos = [
  require('../../images/swm-1.png'),
  require('../../images/swm-2.png'),
  require('../../images/swm-3.png'),
  require('../../images/swm-4.png'),
];

export function Logo() {
  const [idx, setIdx] = useState(0);

  const handleLogoPress = () => {
    setIdx((idx + 1) % logos.length);
  };

  return (
    <TouchableOpacity onPress={handleLogoPress}>
      <Image source={logos[idx]} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    resizeMode: 'contain',
  },
});
