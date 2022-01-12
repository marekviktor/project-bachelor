import {gql, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import colors from './src/colors';

const GET_MEDICAMENT = gql`
  query Query {
    allMedicaments {
      nodes {
        label: name
        value: name
      }
    }
  }
`;

export default function MedicamentPicker(props) {
  const [open, setOpen] = useState(false);

  const {data, error, loading} = useQuery(GET_MEDICAMENT, {pollInterval: 600});

  if (!data) {
    return (
      <Text style={{fontFamily: 'Ubuntu-Regular', fontSize: 20}}>
        Network request failed!
      </Text>
    );
  }

  return (
    <DropDownPicker
      loading={loading}
      searchable={true}
      disabled={props.disabled}
      open={open}
      value={props.value}
      items={data.allMedicaments.nodes}
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
      searchTextInputStyle={{color: colors.BLACK, fontFamily: 'Ubuntu-Regular'}}
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
