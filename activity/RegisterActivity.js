import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {gql, useMutation} from '@apollo/client';
import Toast from 'react-native-simple-toast';
import PrimaryButton from '../src/components/buttons/primaryButton';
import PrimaryInput from '../src/components/buttons/primaryInput';
import SInfo from "react-native-sensitive-info";
import AuthDivider from "../AuthDivider";
import {AuthContext} from "../AuthContext";


const CREATE_USER = gql`
  mutation MyMutation2(
    $email: String!
    $forenameinput: String!
    $passwordinput: String!
    $surnameinput: String!
  ) {
    registeruser(
      input: {
        forenameinput: $forenameinput
        surnameinput: $surnameinput
        emailinput: $email
        passwordinput: $passwordinput
      }
    ) {
      clientMutationId
    }
  }
`;

const AUTHENTICATE = gql`
  mutation MyMutation3($email: String!, $passwordinput: String!) {
    authenticate(input: {emailinput: $email, passwordinput: $passwordinput}) {
      clientMutationId
      jwt
    }
  }
`;

export default function RegisterActivity() {
  const [createUser] = useMutation(CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [overPass, setOverPass] = useState('');
  const authContext = useContext(AuthContext);

  function registerUser() {
    console.log('register')
    if (email !== '' && password !== '' && name !== '' && lastName !== '') {
      if (overPass === password) {
        // auth()
        //   .createUserWithEmailAndPassword(email, password)
        //   .then(() => {
        createUser({
          variables: {
            email: email,
            forenameinput: name,
            passwordinput: password,
            surnameinput: lastName
          },
          onError : (error) => {
            console.log(error.message)
          }
        }).then(()=>{
          authenticate({
            variables: {
              email:email,
              passwordinput:password
            },
            onError:()=>{
              console.log(error.message)
            }
          }).then((r) => authContext.setAuthState(r.data.authenticate.jwt))
        });
        //         executeWarning('Successfully signed up!');
        //       })
        //       .catch(error => {
        //         if (error.code === 'auth/email-already-in-use') {
        //           executeWarning('That email address is already in use!');
        //         }
        //         if (error.code === 'auth/invalid-email') {
        //           executeWarning('That email address is invalid!');
        //         }
        //       });
        //   } else {
        //     executeWarning('Passwords does not match!');
        //   }
        // } else {
        //   executeWarning('All fields must be filled in!');
        // }
      }
    }
  }

  function executeWarning(message) {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  }

  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  function onContentSizeChange(contentWidth, contentHeight) {
    setScrollViewHeight(contentHeight);
  }

  function writeHeight(event) {
    const {height} = event.nativeEvent.layout;
    setScreenHeight(height);
  }

  const scrollEnabled = scrollViewHeight > screenHeight;

  return (
    <View style={styles.container}>
      <ScrollView
        onLayout={event => writeHeight(event)}
        style={styles.ScrollView}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Name</Text>
          <PrimaryInput onChangeText={setName} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Last Name</Text>
          <PrimaryInput onChangeText={setLastName} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Email</Text>
          <PrimaryInput onChangeText={setEmail} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Password</Text>
          <PrimaryInput secureTextEntry={true} onChangeText={setPassword} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Password</Text>
          <PrimaryInput secureTextEntry={true} onChangeText={setOverPass} />
        </View>
      </ScrollView>
      <View style={styles.container_button}>
        <PrimaryButton title={'Create new account'} onPress={()=>registerUser()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    flexDirection: 'column',
  },
  container_column: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 15,
  },
  ScrollView: {
    flex: 1,
  },
  container_button: {
    padding: 25,
    alignItems: 'center',
  },
  inputText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 20,
    paddingBottom: 10,
  },
});
