import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import LoginActivity from './activity/LoginActivity.js';
import HomeActivity from './activity/HomeActivityy.js';
import RegisterActivity from './activity/RegisterActivity.js';
import NewReminderActivity from './activity/NewReminderActivity.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import colors from './src/colors.js';
import ActiveReminders from './activity/ActiveReminders.js';
import {useTranslation} from 'react-i18next';

export default function Firebase() {
  const {t} = useTranslation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  const Stack = createStackNavigator();

  function LoginStack() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginActivity} />
          <Stack.Screen name="Register" component={RegisterActivity} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  function signOutUser() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    return <LoginActivity />;
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={() => signOutUser()} />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  function HomeStack() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name={t('Home')} component={HomeActivity} />
          <Drawer.Screen
            name={t('New Reminder')}
            component={NewReminderActivity}
          />
          <Drawer.Screen
            name={t('Active Reminders')}
            component={ActiveReminders}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  if (!user) {
    return <LoginStack />;
  }

  return <HomeStack />;
}
