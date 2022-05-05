import {firebase} from '@react-native-firebase/auth';
import React, {useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button, Dimensions,
  SafeAreaView,
  StyleSheet, TouchableOpacity,
  View,
} from 'react-native';
import colors from '../src/colors';
import AddButton from '../src/components/buttons/AddButton';
import ProfilePage from '../src/components/profilePage';
import Image from "react-native-scalable-image";
import {AuthContext} from "../AuthContext";
import jwt_decode from "jwt-decode";

export default function HomeActivity({navigation,route}) {
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState(jwt_decode(authContext.authState).email);

  useEffect(() => {
    console.log(user)
  },[user])

  const {t, i18n} = useTranslation();

  const [socket,setSocket] = useState(route.params.socket);

  function addIntent() {
    navigation.navigate(t('New Reminder'));
  }

  const [currentLanguage, setLanguage] = useState(i18n.language);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
  };

  const sk = require('/Users/marekviktor/WebStormProjects/bachelor/src/images/sk.png');
  const en = require('/Users/marekviktor/WebStormProjects/bachelor/src/images/en.png');

  const handleNotification = (text) => {
    socket?.emit("sendText", {
      senderName: user,
      receiverName: "peter",
      text,
    });
  };

  function disconnectUser(){
    console.log("disconnectUser")
    socket?.emit("disconnectUser");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePage user={user} />
      <View style={styles.statsBox}>
         {/*<Bolt />*/}
        <TouchableOpacity
          style={styles.lang}
          onPress={() => {
            if (currentLanguage === 'sk') {
              changeLanguage('en');
            } else {
              changeLanguage('sk');
            }
          }}>
          <Image
            source={currentLanguage === 'en' ? en : sk}
            width={Dimensions.get('window').width * 0.12}
          />
        </TouchableOpacity>
        <AddButton onPress={()=> addIntent()} />
      </View>
      <Button title={'sendNoty'} onPress={()=>handleNotification('Dakujem')}/>
      <Button title={'disconnectUser'} onPress={()=>disconnectUser()}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lang: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    aspectRatio: 1,
    borderRadius: 20,
    margin: 8,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statsBox: {
    borderRadius: 20,
    backgroundColor: colors.ROSE,
    width: '90%',
    height: '12%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
