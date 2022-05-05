import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {gql, useQuery} from "@apollo/client";
import {AuthContext} from "../AuthContext";
import jwt_decode from "jwt-decode";
import { useListState } from 'use-enhanced-state';
import MedicamentSettings from "../src/newComponents/MedicamentSettings";
import {Text} from "@ui-kitten/components";

const GET_INACTIVE_USER_MEDICAMENTS = gql`
    query MyQuery21($userId: Int!, $active: Boolean = false) {
        userMedicaments(condition: {active: $active, userId: $userId}) {
            nodes {
                id
                medicament {
                    title
                    packaging
                }
            }
            totalCount
        }
    }

`;

const RemindersActivity = () => {
    const authProvider = useContext(AuthContext);
    const [sections,setSections] = useListState([]);
    const [activeSections,setActiveSections] = useState([]);

    const {data,loading,error} = useQuery(GET_INACTIVE_USER_MEDICAMENTS,{
        variables:{
            userId:jwt_decode(authProvider.authState).accountid
        },
    })

    useEffect(() => {
        if(data){
            setSections.removeAll((item)=>item)
            for(let i = 0; i < data.userMedicaments.nodes.length; i++) {
                setSections.append({title:data.userMedicaments.nodes[i].medicament.title,content:data.userMedicaments.nodes[i].id})
            }
        }
    },[data])

    useEffect(() => {
        console.log(loading)
    },[loading])

    if(loading) {
        return <Text>Loading...</Text>
    }

    if(error) {
        return <Text>{error.message}</Text>
    }

    const renderSectionTitle = (section) => {
        return (
            <View style={styles.content}/>
        );
    };

    const renderHeader = (section) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <View>
                <MedicamentSettings id={section.content}/>
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections)
    };
    return (
        <SafeAreaView>
                <Accordion
                    sections={sections}
                    activeSections={activeSections}
                    renderSectionTitle={renderSectionTitle}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={updateSections}
                />
        </SafeAreaView>
    );
};

export default RemindersActivity;


const styles = StyleSheet.create({
    header: {
        justifyContent:"center",
        alignItems:"center",
        display: "flex",
        flexDirection:"row",
        backgroundColor:'#6988ff',
        padding:"5%",
        borderBottomWidth:2,
        borderColor:"#ffffff",
        shadowColor:'#FF8FE828',
        shadowOffset:{width:0,height:0},
        shadowOpacity:9,
        shadowRadius:6,
        // boxShadow: "0 0 9px 6px rgba(255,143,232,0.16)",
    },
    headerText:{
        color: '#000000',
        fontSize:17,
    }
});
