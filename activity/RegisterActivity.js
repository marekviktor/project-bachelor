import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {gql, useMutation} from '@apollo/client';
import Toast from 'react-native-simple-toast';
import PrimaryButton from '../src/components/buttons/primaryButton';
import PrimaryInput from '../src/components/buttons/primaryInput';
import colors from '../src/colors';

const CREATE_USER = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(input: $createUserInput) {
      user {
        userid
        email
        firstname
        lastname
      }
    }
  }
`;

export default function RegisterActivity() {
  const [createUser, {loading, error}] = useMutation(CREATE_USER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [overPass, setOverPass] = useState('');

  function registerUser() {
    if (email !== '' && password !== '' && name !== '' && lastName !== '') {
      if (overPass === password) {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            createUser({
              variables: {
                createUserInput: {
                  user: {
                    userid: auth().currentUser.uid,
                    email: email,
                    firstname: name,
                    lastname: lastName,
                  },
                },
              },
            });
            executeWarning('Successfully signed up!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              executeWarning('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
              executeWarning('That email address is invalid!');
            }
          });
      } else {
        executeWarning('Passwords does not match!');
      }
    } else {
      executeWarning('All fields must be filled in!');
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
    var {height} = event.nativeEvent.layout;
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
        <PrimaryButton title={'Create new account'} onPress={registerUser} />
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
