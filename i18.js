import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: {
        'Empty EAN!': 'Empty EAN!',
        'Empty label!': 'Empty label!',
        'Successfully created!': 'Successfully created!',
        'Medicament label': 'Medicament label',
        'New medicament': 'New medicament',
        Submit: 'Submit',
        'No medicament found, do you want to create new one?':
          'No medicament found, do you want to create new one?',
        'Do you want to continue?': 'Do you want to continue?',
        Cancel: 'Cancel',
        'No days chosen!': 'No days chosen!',
        'No times chosen!': 'No times chosen!',
        'No medicaments chosen!': 'No medicaments chosen!',
        'Reminder successfully created!': 'Reminder successfully created!',
        'Sign Out': 'Sign Out',
        vyzva: 'Please scan the EAN code of the medicament!',
        'Updating data': 'Updating data',
        'Choose medicaments': 'Choose medicaments',
        Add: 'Add times',
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
        'Empty EAN!': 'Chýba EAN!',
        'Empty label!': 'Chýba názov lieku!',
        'Successfully created!': 'Liek úspešne vytvorený!',
        'Medicament label': 'Názov lieku',
        'New medicament': 'Nový liek',
        Submit: 'Vytvor',
        'No medicament found, do you want to create new one?':
          'Nebol nájdený žiaden liek, chcete vytvoriť nový?',
        'Do you want to continue?': 'Chcete pokračovať?',
        Cancel: 'Zrušiť',
        'No days chosen!': 'Neboli vybraté žiadne dni!',
        'No times chosen!': 'Neboli vybraté žiadne časy!',
        'No medicaments chosen!': 'Neboli vybraté žiadne lieky!',
        'Reminder successfully created!': 'Pripomienka úspešne vytvorená!',
        'Sign Out': 'Odhlásiť',
        vyzva: 'Prosím naskenujte EAN kód daného lieku!',
        'Updating data': 'Aktualizujem dáta',
        'Choose medicaments': 'Vyberte lieky',
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
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
