import React, {useState, useEffect, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {getTimeList} from '../Reminders/getReminders.js';
import moment from 'moment';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useTranslation} from 'react-i18next';
import PrimaryButton from '../src/components/buttons/primaryButton.js';
import {deleteAllReminders} from '../Reminders/deleteReminder.js';

export default function TabViewExample() {
  const {t} = useTranslation();
  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [routes] = useState([
    {key: '0', title: t('Monday')},
    {key: '1', title: t('Tuesday')},
    {key: '2', title: t('Wednesday')},
    {key: '3', title: t('Thursday')},
    {key: '4', title: t('Friday')},
    {key: '5', title: t('Saturday')},
    {key: '6', title: t('Sunday')},
  ]);

  let scene = {};
  const renderScene = SceneMap(scene);
  for (let x = 0; x < 7; x++) {
    scene[x] = () => <Day x={x} />;
  }
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

function Day(props) {
  const [data, setData] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });
  const [loading, setLoading] = useState(true);

  async function getRemindersFunction() {
    setLoading(true);
    try {
      var storage = await getTimeList();
      var days = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      for (let x = 0; x < 7; x++) {
        if (storage[x] != undefined) {
          for (let i = 0; i < storage[x].length; i++) {
            var tempArray = storage[x][i];
            days[x][i] = {
              time: moment(storage[x][i][0]).format('hh:mm A'),
              title: tempArray.slice(1).join(' ,').toString(),
            };
          }
        }
      }
      setData(days);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getRemindersFunction();
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Timeline style={styles.list} data={data[props.x]} />
      </View>
      <View style={styles.view2}>
        <PrimaryButton
          title={'Delete all reminders'}
          onPress={() => deleteAllReminders()}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  view: {
    padding: '10%',
    width: '100%',
    height: '90%',
  },
  tab: {
    padding: '10%',
    width: '100%',
    height: '90%',
  },
  view2: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  list: {},
});
