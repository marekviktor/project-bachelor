import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import PrimaryButton from '../src/components/buttons/primaryButton';
import PrimaryInput from '../src/components/buttons/primaryInput';
import colors from '../src/colors';
import {gql, useMutation} from "@apollo/client";
import {AuthContext} from "../AuthContext";

const AUTHENTICATE = gql`
  mutation MyMutation($emailinput: String!, $passwordinput: String!) {
    authenticate(
      input: { emailinput: $emailinput, passwordinput: $passwordinput }
    ) {
      clientMutationId
      jwt
    }
  }
`;


export default function LoginActivity({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  const [authenticate] = useMutation(AUTHENTICATE);

  function loginUser() {
    if (email !== '' && password !== '') {
      authenticate({
        variables: {
          emailinput:email,
          passwordinput:password
        }
      }).then(r => {
          if(r.data.authenticate.jwt !== null){
            authContext.setAuthState(r.data.authenticate.jwt)
          }
          else {
            executeWarning("Account not found")
          }
      })
      // a uth()
      //   .signInWithEmailAndPassword(email, password)
      //   .then(() => {
      //     executeWarning('Successfully signed in!');
      //   })
      //   .catch(error => {
      //     if (error.code === 'auth/email-already-in-use') {
      //       executeWarning('That email address is already in use!');
      //     }
      //     if (error.code === 'auth/wrong-password') {
      //       executeWarning('Email and password does not match!');
      //     }
      //     if (error.code === 'auth/too-many-requests') {
      //       executeWarning(
      //         'We have blocked all requests from this device due to unusual activity. Try again later!',
      //       );
      //     }
      //     if (error.code === 'auth/invalid-email') {
      //       executeWarning('That email address is invalid!');
      //     }
      //     if (error.code === 'auth/user-not-found') {
      //       executeWarning('That email address is probably not registered!');
      //     }
      //     console.log(error.message);
      //   });
    } else {
      executeWarning('All fields must be filled in!');
    }
  }

  function executeWarning(message) {
    Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
  }

  function registerIntent() {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginDialog}>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Email</Text>
          <PrimaryInput onChangeText={setEmail} secureTextEntry={false} />
        </View>
        <View style={styles.container_column}>
          <Text style={styles.inputText}>Password </Text>
          <PrimaryInput secureTextEntry={true} onChangeText={setPassword} />
        </View>
        <View style={styles.container_column}>
          <PrimaryButton title={'Login'} onPress={loginUser} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.registerView}
        onPress={() => registerIntent()}>
        <Text style={styles.textRegister}>Don't have account?</Text>
      </TouchableOpacity>
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
