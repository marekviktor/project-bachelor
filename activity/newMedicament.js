import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import PrimaryButton from '../src/components/buttons/primaryButton';
import PrimaryInput from '../src/components/buttons/primaryInput';
import colors from '../src/colors';
import {useTranslation} from 'react-i18next';
import {gql, useMutation} from '@apollo/client';

const CREATE_MEDICAMENT = gql`
  mutation CreateMedicament($createMedicamentInput: CreateMedicamentInput!) {
    createMedicament(input: $createMedicamentInput) {
      medicament {
        name
        ean
      }
    }
  }
`;

export default function NewMedicamentActivity({route}) {
  const [createMedicament, {loading, error}] = useMutation(CREATE_MEDICAMENT);
  const {medicament} = route.params;
  const [ean, setEan] = useState(route.params.medicament);
  const [label, setLabel] = useState(null);
  const {t} = useTranslation();
  console.log("bbb")
  function createMedicamentFunction() {
    if (ean != null) {
      if (label != null) {
        createMedicament({
          variables: {
            createMedicamentInput: {
              medicament: {
                name: label,
                ean: ean,
              },
            },
          },
        }).catch(e => {
          executeWarning(e.message);
        });
        if (!loading) {
          if (!error) {
            executeWarning(t('Successfully created!'));
            setEan(null);
            setLabel(null);
          } else {
            executeWarning(error.message);
          }
        }
      } else {
        executeWarning(t('Empty label!'));
      }
    } else {
      executeWarning(t('Empty EAN!'));
    }
  }

  function executeWarning(message) {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginDialog}>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>{t('Medicament label')}</Text>
          <PrimaryInput placeholder={label} onChangeText={setLabel} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>EAN</Text>
          <PrimaryInput placeholder={ean} onChangeText={setEan} />
        </View>
        <View style={styles.container_column}>
          <PrimaryButton
            title={t('Submit')}
            onPress={() => createMedicamentFunction()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'space-between',
  },
  container_column: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 15,
  },
  loginDialog: {
    width: '100%',
    flex: 1,
  },
  registerView: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  textRegister: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    color: colors.BLACK,
  },
  inputText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    paddingBottom: 10,
  },
});
