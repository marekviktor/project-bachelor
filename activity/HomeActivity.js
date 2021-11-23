import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoginActivity from './LoginActivity.js';
import {
    activateAlarmById,
    cancelAlarmById,
    createAlarm,
    getAlarms,
    deleteAllAlarms,
} from '../Reminders';
import notifee from '@notifee/react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {gql, useMutation} from '@apollo/client';
import Toast from 'react-native-simple-toast';
import MedicamentPicker from '../MedicamentPicker.js';
import {NetworkConsumer} from 'react-native-offline';

const CREATE_MEDICAMENT = gql`
  mutation Mutation($CreateMedicamentInput: CreateMedicamentInput!) {
    createMedicament(input: $CreateMedicamentInput) {
      medicament {
        name
      }
    }
  }
`;

export default function HomeActivity({navigation}) {
    const [mutate] = useMutation(CREATE_MEDICAMENT, {
        onError: err => {
            if (
                err.message ===
                'duplicate key value violates unique constraint "medicament_name_key"'
            ) {
                executeWarning('Medicament ' + inputMedicament + ' already exists!');
            }
        },
        onSuccess: () => {
            executeWarning('Medicament' + inputMedicament + 'successfully created');
        },
    });

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [inputData, setInputData] = useState('');
    const [inputDataActivate, setInputDataActivate] = useState('');
    const [inputMedicament, setInputMedicament] = useState('');

    function handleConfirm(date) {
        setDatePickerVisible(false);
        var momentDate = moment();
        momentDate.set({h: date.getHours(), m: date.getMinutes()});
        createAlarmFunction(momentDate);
        navigation.navigate('NewReminderActivity');
    }

    async function createAlarmFunction(date) {
        try {
            await createAlarm({
                active: true,
                date: date,
                message: 'message',
                snooze: 1,
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function getAlarmsFunction() {
        try {
            const alarms = await getAlarms();
            console.log(alarms);
        } catch (e) {
            console.log(e);
        }
    }

    function displayAllNotifications() {
        notifee
            .getTriggerNotificationIds()
            .then(ids => console.log('All trigger notifications: ', ids));
    }

    function signOutUser() {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        return <LoginActivity/>;
    }

    function executeMutation() {
        if (inputMedicament !== '') {
            mutate({
                variables: {
                    CreateMedicamentInput: {
                        medicament: {
                            name: inputMedicament,
                        },
                    },
                },
            });
        } else {
            executeWarning('Empty medicament field!');
        }
    }

    function executeWarning(message) {
        Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
    }

    return (
        <SafeAreaView>
            <Button title={'Show reminders'} onPress={() => getAlarmsFunction()}/>
            <Button
                title={'Show Notifications'}
                onPress={() => displayAllNotifications()}
            />
            <View style={styles.container_row}>
                <Button
                    title={'Pause reminder'}
                    onPress={() => cancelAlarmById(inputData)}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={inputData => setInputData(inputData)}
                />
            </View>
            <View style={styles.container_row}>
                <Button
                    title={'Activate reminder'}
                    onPress={() => activateAlarmById(inputDataActivate)}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={inputDataActivate =>
                        setInputDataActivate(inputDataActivate)
                    }
                />
            </View>

            <Button
                title={'Delete all reminders'}
                onPress={() => deleteAllAlarms()}
            />
            <Button
                title={'Add medical'}
                onPress={() => setDatePickerVisible(true)}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={date => handleConfirm(date)}
                onCancel={() => setDatePickerVisible(false)}
            />
            <View style={styles.container_row}>
                <Button title={'Add medicament'} onPress={() => executeMutation()}/>
                <TextInput
                    style={styles.input}
                    onChangeText={data => setInputMedicament(data)}
                />
            </View>
            <Button title={'Sign Out'} onPress={() => signOutUser()}/>
            <View style={styles.container_row}>
                <NetworkConsumer>
                    {({isConnected}) => <MedicamentPicker isConnected={isConnected}/>}
                </NetworkConsumer>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        backgroundColor: '#f7d1cd',
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: 40,
        color: 'black',
    },
    container_row: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
});
