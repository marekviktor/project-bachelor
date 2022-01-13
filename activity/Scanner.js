import React, {Component, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {gql, useQuery} from '@apollo/client';
import {useTranslation} from 'react-i18next';
import Image from 'react-native-scalable-image';

const GET_MEDICAMENT = gql`
  query Query {
    allMedicaments {
      nodes {
        label: name
        ean: ean
      }
    }
  }
`;

export default function Scanner({navigation}) {
  const [isBarcodeScannerEnabled, setEnabled] = useState(true);
  const [torchOn, setTorchOn] = useState(false);
  const {data, error, loading} = useQuery(GET_MEDICAMENT, {pollInterval: 600});
  const {t} = useTranslation();
  if (!data) {
    return <Text style={styles.loading}>{t('Updating data')}</Text>;
  }

  console.log(isBarcodeScannerEnabled);
  function onBarCodeRead(e) {
    if (isBarcodeScannerEnabled) {
      console.log(e.data);
      console.log(data.allMedicaments.nodes.length);
      let empty = 0;
      for (let i = 0; i < data.allMedicaments.nodes.length; i++) {
        if (data.allMedicaments.nodes[i].ean == e.data) {
          Alert.alert(
            data.allMedicaments.nodes[i].label,
            t('Do you want to continue?'),
            [
              {
                text: t('Cancel'),
                onPress: () => {
                  setEnabled(true);
                },
              },
              {
                text: 'OK',
                onPress: () => {
                  setEnabled(true);
                  setTorchOn(false);
                  navigation.navigate(t('New Reminder'), {
                    medicament: data.allMedicaments.nodes[i].label,
                  });
                },
              },
            ],
          );
        } else {
          empty += 1;
        }
      }
      if (empty == data.allMedicaments.nodes.length) {
        Alert.alert(
          e.data,
          t('No medicament found, do you want to create new one?'),
          [
            {
              text: t('Cancel'),
              onPress: () => {
                setEnabled(true);
              },
            },
            {
              text: 'OK',
              onPress: () => {
                setTorchOn(false);
                setEnabled(true);
                navigation.navigate(t('New medicament'), {
                  medicament: e.data,
                });
              },
            },
          ],
        );
      }

      setEnabled(false);
    }
  }
  console.log(torchOn);
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={
          torchOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        onBarCodeRead={onBarCodeRead}
        ref={cam => (camera = cam)}>
        <TouchableOpacity
          onPress={() => {
            if (torchOn == false) {
              setTorchOn(true);
            } else {
              setTorchOn(false);
            }
          }}>
          <Image
            source={require('/Users/marekviktor/WebStormProjects/bachelor/src/images/torchOn.png')}
            style={styles.cameraIcon}
            width={Dimensions.get('window').width * 0.15}
          />
        </TouchableOpacity>
        <Text
          style={{
            backgroundColor: 'white',
          }}>
          {t('vyzva')}
        </Text>
      </RNCamera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  loading: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    justifyContent: 'center',
  },
});
