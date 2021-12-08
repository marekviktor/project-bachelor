/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import React from 'react';
import Firebase from './Firebase.js';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';
import {persistCache} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkProvider} from 'react-native-offline';
import './i18.js';

notifee.onBackgroundEvent(async ({detail}) => {
  const {notification} = detail;
  await notifee.cancelNotification(notification.id);
  console.log('Notification pressed on background.');
});

notifee.requestPermission({
  sound: true,
  announcement: true,
  inAppNotificationSettings: true,
});

notifee.createChannel({
  id: 'drugs-notifee',
  name: 'drugs-notifee',
  playSound: true,
  soundName: 'default',
  importance: AndroidImportance.HIGH,
  vibrate: true,
  lights: true,
  lightColor: AndroidColor.CYAN,
});

const cache = new InMemoryCache({
  addTypename: false,
});

persistCache({
  cache,
  storage: AsyncStorage,
}).then(() => {});

const client = new ApolloClient({
  uri: 'http://192.168.1.63:8080/graphql',
  cache,
});
//'http://10.0.2.2:8080/graphql'
AppRegistry.registerComponent(appName, () => App);

function App() {
  return (
    <NetworkProvider>
      <ApolloProvider client={client}>
        <Firebase />
      </ApolloProvider>
    </NetworkProvider>
  );
}
