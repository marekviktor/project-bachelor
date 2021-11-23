import {StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import colors from '../../colors';
import React from 'react';
import Image from 'react-native-scalable-image';

export default function AddButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Image
        source={require('/Users/marekviktor/WebStormProjects/bachelor/src/images/plus.png')}
        width={Dimensions.get('window').width * 0.1}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    aspectRatio: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    margin: 8,
    shadowColor: 'purple',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
