import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {getTimeList} from '../Reminders/getReminders.js';
import moment from 'moment';
import {TabView, SceneMap} from 'react-native-tab-view';

async function getRemindersFunction(x) {
  try {
    var storage = await getTimeList();
    var day = [];
    if (storage[x] != undefined) {
      for (let i = 0; i < storage[x].length; i++) {
        var tempArray = storage[x][i];
        day = day.concat({
          time: moment(storage[x][i][0]).format('hh:mm A'),
          title: tempArray.slice(1).join(' ,').toString(),
        });
      }
      console.log('day:', day);
      return day;
    }
  } catch (e) {
    console.log(e);
  }
}

export default function TabViewExample() {
  let scene = {};

  for (let x = 0; x < 7; x++) {
    var data = getRemindersFunction(x);
    scene[x] = () => <Day data={data} />;
  }

  const renderScene = SceneMap(scene);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '0', title: 'M'},
    {key: '1', title: 'T'},
    {key: '2', title: 'W'},
    {key: '3', title: 'TH'},
    {key: '4', title: 'F'},
    {key: '5', title: 'S'},
    {key: '6', title: 'SU'},
  ]);

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
