import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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
import {useTranslation} from 'react-i18next';

export default function NewReminderActivity({route}) {
  const {t} = useTranslation();
  const {medicament} = route.params;
  const [medi, setMedi] = useState(route.params.medicament);
  const [timeList, setTimeList] = useState([]);
  const [open, setOpen] = useState(false);
  const [medList, setMedList] = useState([]);
  const [dayList, setDayList] = useState({
    0: 1,
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
  });

  function setDate(date) {
    setTimeList([...timeList, date]);
  }

  function executeWarning(message) {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  }
  console.log(medi);
  async function createNewReminder() {
    if (medi != null) {
      try {
        await createReminder({
          active: true,
          name: medicament,
          dayList: dayList,
          timeList: timeList,
        });
        setMedi(null);
        setDayList({
          0: 1,
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
          6: 1,
        });
        executeWarning(t('Reminder successfully created!'));
        setTimeList([]);
      } catch (error) {
        if (error.message === 'No times chosen!') {
          executeWarning(t('No times chosen!'));
        }
        if (error.message === 'No days chosen!') {
          executeWarning(t('No days chosen!'));
        }
      }
    } else {
      if (medList.length == 0) {
        executeWarning(t('No medicaments chosen!'));
      } else {
        for (let x = 0; x < medList.length; x++) {
          try {
            await createReminder({
              active: true,
              name: medList[x],
              dayList: dayList,
              timeList: timeList,
            });
          } catch (error) {
            executeWarning(error.message);
          }
        }
      }
    }
  }

  function displayAllNotifications() {
    notifee
      .getTriggerNotificationIds()
      .then(ids => console.log('All trigger notifications: ', ids));
  }

  async function getRemindersFunction() {
    try {
      const storage = await getAllReminders();
      console.log(storage);
      displayAllNotifications();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteRemindersFunction() {
    try {
      const storage = await deleteAllReminders();
      console.log(storage);
      notifee.cancelAllNotifications();
    } catch (e) {
      console.log(e);
    }
  }

  async function removeById(date) {
    var index = timeList.indexOf(date);
    setTimeList(timeList.filter((_, i) => i !== index));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <PrimaryButton
          title={t('Add')}
          onPress={() => {
            setOpen(true);
          }}></PrimaryButton>
        <TimePicker removeById={removeById} timeList={timeList} />
        <DayPicker days={dayList} />
        <View style={styles.picker}>
          <MedicamentPicker
            placeholder={medi ? medi : t('Choose medicaments')}
            disabled={medi ? true : false}
            value={medList}
            setValue={setMedList}
          />
        </View>
      </View>

      <View style={styles.confirmButton}>
        <PrimaryButton
          title={t('Create new Reminder')}
          onPress={() => createNewReminder()}
        />
      </View>
      {/* <View style={styles.confirmButton}>
        <PrimaryButton
          title={t('Get Reminders')}
          onPress={() => getRemindersFunction()}
        />
      </View> */}
      {/* <View style={styles.confirmButton}>
        <PrimaryButton
          title={t('Delete All Reminders')}
          onPress={() => deleteRemindersFunction()}
        />
      </View> */}
      <DatePicker
        modal
        mode={'time'}
        open={open}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(true);
        }}
      />
    </SafeAreaView>
  );
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
