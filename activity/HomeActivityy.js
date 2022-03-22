import {firebase} from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-scalable-image';
import colors from '../src/colors';
import AddButton from '../src/components/buttons/AddButton';
import ProfilePage from '../src/components/profilePage';
import {io} from "socket.io-client";
import notifee from "@notifee/react-native";

export default function HomeActivity({navigation}) {
  const {t, i18n} = useTranslation();

  function addIntent() {
    navigation.navigate(t('New Reminder'));
  }
  const [currentLanguage, setLanguage] = useState(i18n.language);

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const sk = require('/Users/marekviktor/WebStormProjects/bachelor/src/images/sk.png');
  const en = require('/Users/marekviktor/WebStormProjects/bachelor/src/images/en.png');

  const [user, setUser] = useState("jozef");
  const [socket, setSocket] = useState(null);

  useEffect(()=>{
    setSocket(io('http://localhost:80'));
  },[])

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  useEffect(() => {
    socket?.on("getText", (data) => {
      displayNotification(data.text).then(r => console.log(r));
    });
  }, [socket]);

  const handleNotification = (text) => {
    socket?.emit("sendText", {
      senderName: user,
      receiverName: "marek",
      text,
    });
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <ProfilePage user={firebase.auth().currentUser.email} />
      <View style={styles.statsBox}>
        {/* <Bolt /> */}
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
        <AddButton onPress={addIntent} />
      </View>
      <Button title={'sendNoty'} onPress={()=>handleNotification('Dakujem')}/>
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
