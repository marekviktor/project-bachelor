import AsyncStorage from '@react-native-async-storage/async-storage';
import {remindersStorage} from './constants.js';

export const deleteReminder = async reminder => {
  if (!reminder) {
    throw new Error('Please enter a reminder');
  }
  const storage = await AsyncStorage.getItem(remindersStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      remindersStorage => remindersStorage.oid !== reminder.oid,
    );
    //cancelAlarmWithoutEdit(reminder.oid);
    AsyncStorage.setItem(remindersStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error('No reminders');
  }
};

export const deleteReminderById = async id => {
  if (!id) {
    throw new Error('Please enter a reminder id');
  }
  const storage = await AsyncStorage.getItem(remindersStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      remindersStorage => remindersStorage.id !== id,
    );
    //await cancelAlarmWithoutEdit(id);
    AsyncStorage.setItem(remindersStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error('No reminders');
  }
};

export const deleteAllReminders = async () => {
  const storage = await AsyncStorage.getItem(remindersStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    // parsedStorage.forEach(({oid}) => {
    //   cancelAlarmWithoutEdit(oid);
    // });
    await AsyncStorage.setItem(remindersStorage, JSON.stringify([]));
    return [];
  } else {
    throw new Error('No reminder');
  }
};
