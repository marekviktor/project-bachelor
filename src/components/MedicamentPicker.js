import {gql, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useContext, useState} from 'react';
import {Text} from 'react-native';
import colors from '../colors';
import {AuthContext} from "../../AuthContext";
import jwt_decode from "jwt-decode";

const GET_MEDICAMENT = gql`
    query MyQuery($userId: Int!) {
        userMedicaments(condition: {userId: $userId}) {
            nodes {
                medicament {
                    title
                    supplement
                    strength
                    packaging
                    id
                }
                admin {
                    lastName
                    firstName
                }
                dosing
                nextPrescriptionDate
            }
        }
    }

`;

export default function MedicamentPicker(props) {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const {data, error, loading} = useQuery(GET_MEDICAMENT,{
      pollInterval: 15000,
      variables:{
          userId:jwt_decode(authContext.authState).accountid
      }
  });

  if(loading) {
      return (
          <Text style={{fontFamily: 'Ubuntu-Regular', fontSize: 20}}>
              Loading
          </Text>
      );
  }

  if (error) {
    return (
      <Text style={{fontFamily: 'Ubuntu-Regular', fontSize: 20}}>
          {error.message}
      </Text>
    );
  }

  let items = []

  for(let i =0;i<data.userMedicaments.nodes.length;i++) {
      items.push({label:data.userMedicaments.nodes[i].medicament.title,value:data.userMedicaments.nodes[i].medicament.id})
  }

  return (
    <DropDownPicker
      loading={loading}
      searchable={true}
      disabled={props.disabled}
      open={open}
      value={props.value}
      items={items}
      addCustomItem={false}
      setOpen={setOpen}
      setValue={props.setValue}
      style={{
        color: colors.BLACK,
        backgroundColor: colors.ROSE,
        borderWidth: 0,
        borderRadius: 32,
      }}
      textStyle={{
        color: colors.BLACK,
        fontFamily: 'Ubuntu-Regular',
        fontSize: 20,
      }}
      placeholder={props.placeholder}
      dropDownContainerStyle={{
        borderWidth: 0,
        borderRadius: 0,
      }}
      searchTextInputStyle={{
        color: colors.BLACK,
        fontFamily: 'Ubuntu-Regular',
      }}
      searchContainerStyle={{
        padding: 0,
        paddingBottom: '4%',
        paddingTop: '4%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderBottomWidth: 0,
      }}
      searchPlaceholder={'Search'}
      disableBorderRadius={true}
      multiple={true}
    />
  );
}
