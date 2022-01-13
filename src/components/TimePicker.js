import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../colors';
import React from 'react';
import moment from 'moment';
import Image from 'react-native-scalable-image';
import {useTranslation} from 'react-i18next';

function Time(props) {
  const {i18n} = useTranslation();
  console.log(i18n.language);
  return (
    <View style={styles.container_row}>
      <Text style={styles.text}>
        {i18n.language == 'en'
          ? moment(props.date).format('hh:mm A')
          : moment(props.date).format('hh:mm')}
      </Text>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => props.removeById(props.date)}>
        <Image
          source={require('/Users/marekviktor/WebStormProjects/bachelor/src/images/x-mark.png')}
          width={Dimensions.get('window').width * 0.06}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function TimePicker(props) {
  const {timeList, removeById} = props;
  let timeContainer = [];
  Object.keys(timeList).forEach((key, i) => {
    timeContainer.push(
      <Time key={i} removeById={removeById} date={timeList[key]} />,
    );
  });

  return <View style={[styles.timeBox]}>{timeContainer}</View>;
}

const styles = StyleSheet.create({
  timeBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
  },
  text: {
    padding: 5,
    borderWidth: 0.5,
    fontFamily: 'Ubuntu-Bold',
    color: colors.BLACK,
    fontSize: 26,
    marginTop: '2%',
  },
  container_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    paddingLeft: '2%',
    paddingTop: '2.25%',
  },
});
