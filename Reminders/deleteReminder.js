import AsyncStorage from '@react-native-async-storage/async-storage';
import {medicamentStorage, timeStorage} from './constants.js';

export const deleteReminder = async reminder => {
  if (!reminder) {
    throw new Error('Please enter a reminder');
  }
  const storage = await AsyncStorage.getItem(medicamentStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      medicamentStorage => medicamentStorage.oid !== reminder.oid,
    );
    //cancelAlarmWithoutEdit(reminder.oid);
    AsyncStorage.setItem(medicamentStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error('No reminders');
  }
};

export const deleteReminderById = async id => {
  if (!id) {
    throw new Error('Please enter a reminder id');
  }
  const storage = await AsyncStorage.getItem(medicamentStorage);

  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const updatedStorage = parsedStorage.filter(
      medicamentStorage => medicamentStorage.id !== id,
    );
    //await cancelAlarmWithoutEdit(id);
    AsyncStorage.setItem(medicamentStorage, JSON.stringify(updatedStorage));

    return updatedStorage;
  } else {
    throw new Error('No reminders');
  }
};

export const deleteAllReminders = async () => {
  const storage = await AsyncStorage.getItem(medicamentStorage);
  if (storage && storage.length > 0) {
    await AsyncStorage.setItem(medicamentStorage, JSON.stringify([]));
    await AsyncStorage.setItem(timeStorage, JSON.stringify([]));
    return [];
  } else {
    throw new Error('No reminder');
  }
};
