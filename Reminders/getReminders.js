import AsyncStorage from '@react-native-async-storage/async-storage';
import {medicamentStorage, timeStorage} from './constants.js';

export const getAllReminders = async () => {
  const storage = await AsyncStorage.getItem(medicamentStorage);

  if (storage && storage.length > 0) {
    return JSON.parse(storage);
  } else {
    return [];
  }
};

export const getTimeList = async () => {
  const storage = await AsyncStorage.getItem(timeStorage);

  if (storage && storage.length > 0) {
    return JSON.parse(storage);
  } else {
    return [];
  }
}

export const getReminderById = async id => {
  if (!id) {
    throw new Error('Please enter an id');
  }

  const storage = await AsyncStorage.getItem(medicamentStorage);
  if (storage && storage.length > 0) {
    const parsedStorage = JSON.parse(storage);
    const reminder = parsedStorage.find(
      medicamentStorage => medicamentStorage.id == id,
    );
    if (reminder) {
      return reminder;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
