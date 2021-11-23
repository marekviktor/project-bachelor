import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../../colors';
import React from 'react';

export default function PrimaryButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingTop: '2.5%',
    paddingBottom: '2.5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: colors.PURPLE,
    borderRadius: 32,
    maxWidth: '100%',
  },
  text: {
    color: colors.BLACK,
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
