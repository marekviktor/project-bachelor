import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from '../../colors';
import React from 'react';
import Image from 'react-native-scalable-image';

export default function Bolt(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>3</Text>
      <Image
        source={require('/Users/marekviktor/WebStormProjects/bachelor/src/images/flash.png')}
        width={Dimensions.get('window').width * 0.1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    aspectRatio: 1,
    borderRadius: 20,
    margin: 8,
    flexDirection: 'row',
  },
  text: {
    color: colors.LIGHTNING,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
  },
});
