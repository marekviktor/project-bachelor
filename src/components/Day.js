import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../colors';

export default function Day(props) {
  let {toggleDay, day, days} = props;

  const [isActiveDay, setActive] = useState(1 === days[day]);
  const {t} = useTranslation()

  let daysMapping = {
    0: t('Monday'),
    1: t('Tuesday'),
    2: t('Wednesday'),
    3: t('Thursday'),
    4: t('Friday'),
    5: t('Saturday'),
    6: t('Sunday'),
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
