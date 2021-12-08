import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Add: 'Add',
        Home: 'Home',
        'New Reminder': 'New Reminder',
        'Active Reminders': 'Active Reminders',
      },
    },
    sk: {
      translation: {
        Add: 'Pridaj',
        Home: 'Domov',
        'New Reminder': 'Nová pripomienka',
        'Active Reminders': 'Aktívne pripomienky',
      },
    },
  },
  lng: 'sk',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
