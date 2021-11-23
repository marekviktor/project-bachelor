import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../colors';

export default function Day(props) {
  let {toggleDay, day, days} = props;

  const [isActiveDay, setActive] = useState(1 === days[day]);

  let daysMapping = {
    0: 'M',
    1: 'Th',
    2: 'Wed',
    3: 'Th',
    4: 'Fr',
    5: 'Sa',
    6: 'Su',
  };
  function toggle() {
    setActive(!isActiveDay);
    toggleDay(day);
  }
  return (
    <TouchableOpacity
      style={[styles.default, isActiveDay ? styles.active : styles.inactive]}
      onPress={() => toggle()}>
      <Text>{daysMapping[day]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: '80%',
    margin:'1%',
    aspectRatio: 1,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: colors.PURPLE,
  },
  inactive: {
    backgroundColor: colors.WHITE,
  },
});
