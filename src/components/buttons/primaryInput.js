import {StyleSheet, TextInput} from 'react-native';
import colors from '../../colors';
import React from 'react';

export default function PrimaryInput(props) {
  if (props.color === 'green') {
    return (
      <TextInput
        secureTextEntry={props.secureTextEntry}
        style={[styles.Rectangle, {shadowColor: colors.OLIVE}]}></TextInput>
    );
  }
  if (props.color === 'red') {
    return (
      <TextInput
        secureTextEntry={props.secureTextEntry}
        style={[styles.Rectangle, {shadowColor: colors.RED}]}></TextInput>
    );
  }
  return (
    <TextInput
      value={props.placeholder}
      onChangeText={value => props.onChangeText(value)}
      secureTextEntry={props.secureTextEntry}
      style={styles.Rectangle}></TextInput>
  );
}

const styles = StyleSheet.create({
  Rectangle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 16,
    padding: 10,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    height: 45,
    width: '85%',
    textAlign: 'center',
    shadowColor: 'purple',
    shadowOffset: {height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
