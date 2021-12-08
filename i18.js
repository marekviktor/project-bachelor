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
        Monday: 'M',
        Tuesday: 'T',
        Wednesday: 'W',
        Thursday: 'Th',
        Friday: 'F',
        Saturday: 'S',
        Sunday: 'Su',
        'Delete All Reminders': 'Delete All Reminders',
        'Create new Reminder': 'Create new Reminder',
        'Get Reminders': 'Get Reminders',
      },
    },
    sk: {
      translation: {
        Add: 'Pridaj čas',
        Home: 'Domov',
        'New Reminder': 'Nová pripomienka',
        'Active Reminders': 'Aktívne pripomienky',
        Monday: 'P',
        Tuesday: 'U',
        Wednesday: 'S',
        Thursday: 'Š',
        Friday: 'P',
        Saturday: 'SO',
        Sunday: 'N',
        'Delete All Reminders': 'Vymaž všetky pripomienky',
        'Create new Reminder': 'Vytvor novú pripomienku',
        'Get Reminders': 'Vypíš všetky pripomineky',
      },
    },
  },
  lng: 'sk',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
