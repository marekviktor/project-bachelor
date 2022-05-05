import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import React from 'react';
import AuthDivider from './AuthDivider.js';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';
import {NetworkProvider} from 'react-native-offline';
import './i18.js';
import {setContext} from "@apollo/client/link/context";
import {AuthProvider} from "./AuthContext";
import SInfo from "react-native-sensitive-info";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

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


const getToken = async () => {
    const token = await SInfo.getItem("loginToken", {
        sharedPreferencesName: "loginTokenPreferences",
        keychainService: "loginTokenKeychain",
    })
    return token || null;
};

// const cache = new InMemoryCache({
//     addTypename: false,
// });
//
// persistCache({
//     cache,
//     storage: AsyncStorage,
// }).then(() => {
// });

const httpLink = createHttpLink({
    uri: 'http://192.168.1.57:8080/graphql',
});

const authLink = setContext(async (_, {headers}) => {
    const token = await getToken();
    console.log(token);
    if(token){
        return {
            headers: {
                ...headers,
                authorization:`Bearer ${token}`,
            }
        }
    }
    else {
        return {
            headers: {
                ...headers,
            }
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache:new InMemoryCache(),
});

AppRegistry.registerComponent(appName, () => App);

function App() {
    return (
        <NetworkProvider>
            <AuthProvider>
                <ApolloProvider client={client}>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        <AuthDivider/>
                    </ApplicationProvider>
                </ApolloProvider>
            </AuthProvider>
        </NetworkProvider>
    );
}
