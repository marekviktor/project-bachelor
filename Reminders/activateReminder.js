import moment from 'moment';
import notifee, {RepeatFrequency, TriggerType} from '@notifee/react-native';
import {getReminderById, getTimeList} from './getReminders';
import {getAllReminders} from '../Reminders/getReminders.js';
import {timeStorage} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatDate(data, day) {
  var date = new Date(data);
  var currentDay = date.getDay();
  var distance = (day + 8 - currentDay) % 7;
  date.setDate(date.getDate() + distance);
  if (moment().isAfter(date)) {
    date = new Date(date.setDate(date.getDate() + 7));
  }
  date.setSeconds(0);
  return date;
}

async function createTrigger(date, message, triggerId) {
  const timeTrigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.WEEKLY,
  };

  await notifee.createTriggerNotification(
    {
      id: triggerId,
      title: 'Medicaments cure',
      body: message.toString(),
      android: {
        channelId: 'drugs-notifee',
      },
    },
    timeTrigger,
  );
}

export const activateReminder = async id => {
  if (!id) {
    throw new Error('Undefined ID');
  }
  const reminder = await getReminderById(id);
  const medicamentStorage = await getAllReminders();
  const timeStorageList = await getTimeList();

  let days = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};

  if (!reminder || !medicamentStorage || !timeStorageList) {
    throw new Error('Empty storage!');
  }

  for (let day = 0; day < 7; day++) {
    for (let medLen = 0; medLen < medicamentStorage.length; medLen++) {
      for (let i = 0; i < medicamentStorage[medLen]['time'].length; i++) {
        var formattedDate = new Date(medicamentStorage[medLen]['time'][i]);
        formattedDate.setSeconds(0);
        formattedDate.setMilliseconds(0);
        formattedDate = formattedDate.toJSON();
        if (medicamentStorage[medLen]['days'][day] === 1) {
          if (days[day].length > 0) {
            var q = 0;
            var len = days[day].length;
            for (let x = 0; x < len; x++) {
              if (days[day][x].includes(formattedDate)) {
                days[day][i].push(medicamentStorage[medLen]['name']);
                q++;
              }
            }
            if (q == 0) {
              days[day].push([formattedDate]);
              days[day][len].push(medicamentStorage[medLen]['name']);
            }
          } else {
            days[day].push([formattedDate]);
            days[day][i].push(medicamentStorage[medLen]['name']);
          }
        }
      }
    }
  }

  console.log(days);

  notifee.cancelAllNotifications();
  for (let day = 0; day < 7; day++) {
    var len = days[day].length;
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        var date = new Date(formatDate(days[day][i][0], day));
        var tempArray = days[day][i];
        var id = day + ':' + date.toJSON() + ':' + tempArray.slice(1);
        createTrigger(date, tempArray.slice(1).join(' | '), id);
      }
    }
  }
  await AsyncStorage.setItem(timeStorage, JSON.stringify(days));
};
