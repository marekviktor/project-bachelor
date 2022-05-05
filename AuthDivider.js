import React, {useContext, useState} from 'react';
import LoginActivity from './activity/LoginActivity.js';
import HomeActivity from './activity/HomeActivityy.js';
import NewMedicamentActivity from './activity/newMedicament';
import Scanner from './activity/Scanner';
import RegisterActivity from './activity/RegisterActivity.js';
import NewReminderActivity from './activity/NewReminderActivity.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList,} from '@react-navigation/drawer';
import ActiveReminders from './activity/ActiveReminders.js';
import {useTranslation} from 'react-i18next';
import { LogBox } from 'react-native';
import notifee from "@notifee/react-native";
import {AuthContext} from "./AuthContext";
import RemindersActivity from "./activity/Reminders";

async function displayNotification(text) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'Message from doctor',
    body: text.toString(),
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon',
    },
  });
}

export default function AuthDivider() {
  LogBox.ignoreAllLogs();
  const {t} = useTranslation();
  const [socket, setSocket] = useState(null);
  const authContext = useContext(AuthContext);

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }
  //
  // useEffect(() => {
  //   return auth().onAuthStateChanged(onAuthStateChanged);
  // }, []);

  // useEffect(()=>{
  //   if(!socket) {
  //     setSocket(io('http://localhost:80'));
  //   }
  // },[io,socket])
  //
  // useEffect(() => {
  //   if(auth().currentUser){
  //     socket?.emit("newUser", auth().currentUser.email);
  //     console.log("debug")
  //   }
  // }, [socket,auth]);
  //
  // useEffect(() => {
  //   socket?.on("getAdmins", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  //
  // useEffect(() => {
  //   socket?.on("getText", (data) => {
  //     console.log(data)
  //     displayNotification(data.text).then()
  //   });
  // }, [socket]);

  if (authContext.loading) return null;

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
    authContext.setAuthState("")
    return <LoginActivity />
  }

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label={t('Sign Out')} onPress={() => signOutUser()} />
      </DrawerContentScrollView>
    );
  }

  const Drawer = createDrawerNavigator();

  function HomeStack() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name={t('Home')} initialParams={{socket:socket}} component={HomeActivity} />
          <Drawer.Screen
              name={t('Reminders')}
              component={RemindersActivity}
          />
          <Drawer.Screen name={t('EAN')} component={Scanner} />
          <Drawer.Screen
            name={t('New medicament')}
            component={NewMedicamentActivity}
            initialParams={{medicament: null}}
          />
          <Drawer.Screen
            name={t('New Reminder')}
            component={NewReminderActivity}
            initialParams={{medicament: null}}
          />
          <Drawer.Screen
            name={t('Active Reminders')}
            component={ActiveReminders}
          />

        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  if (authContext.authState === "") {
    return <LoginStack />;
  }

  return <HomeStack />;
}
