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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  useEffect(() => {
    getRemindersFunction();
  }, []);

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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  console.log('dt:  ', data);

  let scene = {};

  for (let x = 0; x < 7; x++) {
    scene[x] = () => <Day data={data[x]} />;
  }

  const renderScene = SceneMap(scene);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

class Day extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.data);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <Timeline style={styles.list} data={this.props.data} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  view: {
    padding: '10%',
    width: '100%',
  },
  list: {},
});
