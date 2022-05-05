import AsyncStorage from '@react-native-async-storage/async-storage';
import Reminder from './Reminder.js';
import uuid from './uuid.js';
import {medicamentStorage} from './constants.js';
import {activateReminder} from './activateReminder.js';

const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const createReminder = async ({timeList, dayList, name, active}) => {

  if (timeList.length === 0) {
    throw new Error('No times chosen!');
  }
  if (equals(dayList, {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0})) {
    throw new Error('No days chosen!');
  }
  const id = uuid();
  const reminder = new Reminder({
    id,
    oid: id,
    name,
    active,
    dayList,
    timeList,
  });

  const storage = await AsyncStorage.getItem(medicamentStorage);

  if (storage && storage.length > 0) {
    const updatedStorage = JSON.stringify([...JSON.parse(storage), reminder]);
    await AsyncStorage.setItem(medicamentStorage, updatedStorage);
  } else {
    await AsyncStorage.setItem(medicamentStorage, JSON.stringify([reminder]));
  }

  await activateReminder(id);
};
