import React, {Component, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PrimaryButton from '../src/components/buttons/primaryButton';
import DayPicker from '../src/components/DayPicker';
import DatePicker from 'react-native-date-picker';
import MedicamentPicker from '../MedicamentPicker.js';
import {getAllReminders} from '../Reminders/getReminders.js';
import {createReminder} from '../Reminders/createReminder.js';
import Toast from 'react-native-simple-toast';
import TimePicker from '../src/components/TimePicker';
import {deleteAllReminders} from '../Reminders/deleteReminder';
import notifee from '@notifee/react-native';

export default class NewReminderActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: [],
      open: false,
      medList: [],
      dayList: {0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1},
    };
    this.setValue = this.setValue.bind(this);
  }

  setDate = date => {
    this.setState({
      timeList: [...this.state.timeList, date],
    });
  };

  createNewReminder = async () => {
    try {
      await createReminder({
        active: true,
        dayList: this.state.dayList,
        timeList: this.state.timeList,
        medList: this.state.medList,
      });
    } catch (error) {
      this.executeWarning(error.message);
    }
  };

  displayAllNotifications = () => {
    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
  };

  executeWarning = message => {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  };

  getRemindersFunction = async () => {
    try {
      const storage = await getAllReminders();
      console.log(storage);
      this.displayAllNotifications();
    } catch (e) {
      console.log(e);
    }
  };

  deleteRemindersFunction = async () => {
    try {
      const storage = await deleteAllReminders();
      console.log(storage);
    } catch (e) {
      console.log(e);
    }
  };

  removeById = async date => {
    var index = this.state.timeList.indexOf(date);

    this.setState({
      timeList: this.state.timeList.filter((_, i) => i !== index),
    });
  };

  setValue(callback) {
    this.setState(state => ({
      medList: callback(state.medList),
    }));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.view}>
          <PrimaryButton
            title={'Add time'}
            onPress={() => {
              this.setState({open: true});
            }}></PrimaryButton>
          <TimePicker
            removeById={this.removeById}
            timeList={this.state.timeList}
          />
          <DayPicker days={this.state.dayList} />
          <View style={styles.picker}>
            <MedicamentPicker
              value={this.state.medList}
              setValue={this.setValue}
            />
          </View>
        </View>
        <View style={styles.confirmButton}>
          <PrimaryButton
            title={'Delete All Reminders'}
            onPress={this.deleteRemindersFunction}
          />
        </View>
        <View style={styles.confirmButton}>
          <PrimaryButton
            title={'Create new Reminder'}
            onPress={this.createNewReminder}
          />
        </View>
        <View style={styles.confirmButton}>
          <PrimaryButton
            title={'Get Reminders'}
            onPress={this.getRemindersFunction}
          />
        </View>
        <DatePicker
          modal
          mode={'time'}
          open={this.state.open}
          date={new Date()}
          onConfirm={date => {
            this.setState({open: false});
            this.setDate(date);
          }}
          onCancel={() => {
            this.setState({open: false});
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    marginTop: '8%',
  },
  view: {
    marginTop: '5%',
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  confirmButton: {
    marginBottom: '5%',
  },
});
