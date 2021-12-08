import {View, StyleSheet, Dimensions, Text} from 'react-native';
import colors from '../colors';
import React from 'react';
import Image from 'react-native-scalable-image';

export default function ProfilePage() {
  return (
    <View style={styles.profileBox}>
      <Image
        source={require('/Users/marekviktor/WebStormProjects/bachelor/src/images/profilePicture.png')}
        width={Dimensions.get('window').width * 0.25}
      />
      <Text></Text>
    </View>
  );
}
const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: colors.PURPLE,
    borderBottomRightRadius: 40,
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
