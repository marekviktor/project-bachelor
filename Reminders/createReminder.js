import AsyncStorage from '@react-native-async-storage/async-storage';
import Reminder from './Reminder.js';
import uuid from './uuid.js';
import {remindersStorage} from './constants.js';
import {activateReminder} from './activateReminder.js';

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const createReminder = async ({timeList, dayList, medList, active}) => {
  if (timeList.length === 0) {
    throw new Error('Empty timeList array!');
  }
  if (equals(dayList, {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})) {
    throw new Error('Empty dayList array!');
  }
  if (medList.length === 0) {
    throw new Error('Empty medList array!');
  }
  const id = uuid();
  const reminder = new Reminder({
    id,
    oid: id,
    active,
    dayList,
    timeList,
    medList,
  });

  const storage = await AsyncStorage.getItem(remindersStorage);

  if (storage && storage.length > 0) {
    const updatedStorage = JSON.stringify([...JSON.parse(storage), reminder]);
    await AsyncStorage.setItem(remindersStorage, updatedStorage);
  } else {
    await AsyncStorage.setItem(remindersStorage, JSON.stringify([reminder]));
  }

  activateReminder(id);
};
