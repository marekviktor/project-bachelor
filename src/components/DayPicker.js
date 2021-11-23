import React from 'react';
import {View, StyleSheet} from 'react-native';
import Day from './Day';

export default function DayPicker(props) {
  let {days} = props;

  const toggleDay = day => {
    days[day] ? (days[day] = 0) : (days[day] = 1);
  };

  let daysContainer = [];

  Object.keys(days).forEach((day, i) => {
    daysContainer.push(
      <Day key={i} toggleDay={toggleDay} day={day} days={days} />,
    );
  });

  return <View style={[styles.dayBox]}>{daysContainer}</View>;
}

const styles = StyleSheet.create({
  dayBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    display: 'flex',
    height: 50,
    alignItems: 'center',
    marginTop: '8%',
    width: '80%',
  },
});
