import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import colors from '../src/colors';
import AddButton from '../src/components/buttons/AddButton';
import Bolt from '../src/components/buttons/Bolt';
import ProfilePage from '../src/components/profilePage';

export default function HomeActivity({navigation}) {
  function addIntent() {
    navigation.navigate('New Reminder');
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProfilePage />
      <View style={styles.statsBox}>
        <Bolt />
        <AddButton onPress={addIntent} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
