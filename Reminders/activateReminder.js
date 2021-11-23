import moment from 'moment';
import notifee, {RepeatFrequency, TriggerType} from '@notifee/react-native';
import {getReminderById} from './getReminders';

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

async function createTrigger(date, reminder) {
  const timeTrigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.WEEKLY,
  };

  await notifee.createTriggerNotification(
    {
      id: reminder.id.toString(),
      title: 'Medicaments cure',
      body: reminder['medList'].toString(),
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

  if (!reminder) {
    throw new Error('Reminder not exists!');
  }

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < reminder['time'].length; j++) {
      if (reminder['days'][i] === 1) {
        var date = new Date(formatDate(reminder['time'][j], i));
        console.log(date.toLocaleString());
        createTrigger(date, reminder);
      }
    }
  }
};
