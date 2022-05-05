import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {gql, useQuery} from "@apollo/client";
import DayPicker from "../components/DayPicker";
import {Button, IndexPath, Input, Select, SelectItem, Text} from "@ui-kitten/components";
import DatePicker from 'react-native-date-picker';
import moment from "moment";
import {useListState} from "use-enhanced-state";
import {createReminder} from "../../Reminders/createReminder";
import Toast from "react-native-simple-toast";
import {t} from "i18next";

const GET_USER_MEDICAMENT = gql`
    query MyQuery2($id: Int!) {
        userMedicament(id: $id) {
            admin {
                firstName
                lastName
            }
            medicament {
                id
                title
            }
            createdAt
            dosing
            evening
            everyXday
            interval
            medicamentId
            morning
            nextPrescriptionDate
            noon
            updatedAt
            userMedicamentDayId
            userMedicamentDay {
                monday
                tuesday
                wednesday
                thursday
                friday
                saturday
                sunday
            }
        }
    }
`;


const days = ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa']


const MedicamentSettings = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [open, setOpen] = useState(false);
    const [time, setTime] = useListState([]);
    const [dayPart, setDayPart] = useState(null)
    const [updated,setUpdated] = useState(false);
    const [dayState, setDayState] = useState({
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    })

    const {data, loading, error} = useQuery(GET_USER_MEDICAMENT, {
        variables: {
            id: props.id
        },
    })

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        return <Text>{error.message}</Text>
    }

    if (!loading && !updated && !data.userMedicament.everyXday && data.userMedicament.userMedicamentDayId) {
        setDayState({
            0: data.userMedicament.userMedicamentDay.monday? 1 : 0,
            1: data.userMedicament.userMedicamentDay.tuesday? 1 : 0,
            2: data.userMedicament.userMedicamentDay.wednesday ? 1 : 0,
            3: data.userMedicament.userMedicamentDay.thursday? 1 : 0,
            4: data.userMedicament.userMedicamentDay.friday? 1 : 0,
            5: data.userMedicament.userMedicamentDay.saturday ? 1 : 0,
            6: data.userMedicament.userMedicamentDay.sunday ? 1 : 0,
        })
        setUpdated(true)
    }

    function submitMedicament() {
        let timeList = []
        for (let i = 0; i < time.length; i++) {
            timeList.push(time[i].time)
        }
        let dayList = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
        };

        if (!data.userMedicament.everyXday && data.userMedicament.userMedicamentDayId) {
            <DayPicker days={dayListS}/>
        }

        if (data.userMedicament.everyXday && data.userMedicament.everyXday === 1) {
            for (let i = 0; i < 7; i++) {
                dayList[i] = 1
            }
        }

        if (data.userMedicament.everyXday && data.userMedicament.everyXday === 2) {
            dayList[selectedIndex.row] = 1
            let even = false
            if (selectedIndex.row % 2 === 0) {
                even = true
            }
            for (let i = selectedIndex.row; i < 7 + selectedIndex.row; i++) {
                let index;
                if (i > 6) {
                    index = i - 7
                } else {
                    index = i
                }
                if (even) {
                    if (index % 2 === 0) {
                        dayList[index] = 1
                    }
                } else {
                    if (index % 2 !== 0) {
                        dayList[index] = 1
                    }
                }
            }

        }
        createNewReminder(timeList, dayList).then()
    }

    function resetStatus() {
        console.log(dayState)
    }

    function executeWarning(message) {
        Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
    }

    async function createNewReminder(timeList, dayList) {
        try {
            await createReminder({
                active: true,
                name: data.userMedicament.medicament.title,
                dayList: dayList,
                timeList: timeList
            }).then(() => executeWarning(t('Reminder successfully created!')));
        } catch (error) {
            console.error(error);
            if (error.message === 'No times chosen!') {
                executeWarning(t('No times chosen!'));
            }
            if (error.message === 'No days chosen!') {
                executeWarning(t('No days chosen!'));
            }
        }
    }

    function getTime(part) {
        if (part === null) {
            return new Date()
        }
        let value = setTime.find({id: part})
        if (value === undefined) {
            setTime.add({id: part, time: new Date()})
            return new Date()
        }
        return value.time;
    }

    return (
        <SafeAreaView style={styles.container}>
            {data.userMedicament.everyXday &&
                <>
                    <View style={styles.row}>
                        <Text style={styles.text}>
                            Frekvencia užívania je každý {data.userMedicament.everyXday}. deň.
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.text}>Počiatočný deň</Text>
                        <Select
                            style={styles.select}
                            value={days[selectedIndex.row]}
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}>
                            {days.map((day, key) => (
                                <SelectItem key={key} title={day}/>
                            ))}
                        </Select>
                    </View>
                </>
            }
            {!data.userMedicament.everyXday && data.userMedicament.userMedicamentDayId &&
                <View style={styles.picker}>
                    <DayPicker days={dayState}/>
                </View>
            }
            {data.userMedicament.interval &&
                <View style={styles.row}>
                    <Text style={styles.text}>
                        Frekvencia užívanania je každých {data.userMedicament.interval}. hodín.
                    </Text>
                </View>}

            {data.userMedicament.interval &&
                <View style={styles.row}>
                    <Text style={styles.text}>Počiatočná hodina</Text>
                    <TouchableOpacity style={styles.controlContainer} onPress={() => {
                        setDayPart("interval");
                        setOpen(true)
                    }}>
                        <Text style={styles.textWhite}
                              status='control'>{moment(getTime("interval")).format("HH:mm")}</Text>
                    </TouchableOpacity>
                </View>
            }
            {data.userMedicament.morning &&
                <View style={styles.row}>
                    <Text style={styles.text}>Ráno</Text>
                    <TouchableOpacity style={styles.controlContainer} onPress={() => {
                        setDayPart("morning");
                        setOpen(true)
                    }}>
                        <Text style={styles.textWhite}
                              status='control'>{moment(getTime("morning")).format("HH:mm")}</Text>
                    </TouchableOpacity>
                </View>
            }
            {data.userMedicament.noon &&
                <View style={styles.row}>
                    <Text style={styles.text}>Poludnie</Text>
                    <TouchableOpacity style={styles.controlContainer} onPress={() => {
                        setDayPart("noon");
                        setOpen(true)
                    }}>
                        <Text style={styles.textWhite} status='control'>{moment(getTime("noon")).format("HH:mm")}</Text>
                    </TouchableOpacity>
                </View>
            }
            {data.userMedicament.evening &&
                <View style={styles.row}>
                    <Text style={styles.text}>Večer</Text>
                    <TouchableOpacity style={styles.controlContainer} onPress={() => {
                        setDayPart("evening");
                        setOpen(true)
                    }}>
                        <Text style={styles.textWhite}
                              status='control'>{moment(getTime("evening")).format("HH:mm")}</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.rowButton}>
                <Button style={styles.button} status='success' onPress={() => submitMedicament()}>
                    Submit
                </Button>
                <Button style={styles.button} status='danger' onPress={() => resetStatus()}>
                    Reset
                </Button>
            </View>
            <DatePicker
                modal
                mode={'time'}
                open={open}
                date={getTime(dayPart)}
                onConfirm={date => {
                    setOpen(false);
                    const index = setTime.find({id: dayPart})
                    if (index !== undefined) {
                        setTime.update({id: index.id, time: date})
                    } else {
                        setTime.add({id: dayPart, time: date})
                    }
                }
                }
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </SafeAreaView>
    );
};

export default MedicamentSettings;

const styles = StyleSheet.create({
    textWhite: {
        fontSize: 16,
        padding: "1%",
        color: 'white',
    },
    picker:{
        padding: "2%",
        display: 'flex',
        width: '80%',
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
    },
    text: {
        fontSize: 16,
    },
    select: {
        width: '50%',
    },
    row: {
        padding: "2%",
        display: 'flex',
        width: '80%',
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "row",
    },
    rowButton: {
        borderTopWidth: 0.3,
        borderColor: '#121212',
        padding: "4%",
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: '#ffffff',
    },
    controlContainer: {
        borderRadius: 4,
        backgroundColor: '#6988ff',
        padding: "1%",
        marginLeft: "2%"
    },
});