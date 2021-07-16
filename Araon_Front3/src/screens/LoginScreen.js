import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CheckBox } from 'react-native-elements'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
// import { emailValidator } from '../helpers/emailValidator'
// import { passwordValidator } from '../helpers/passwordValidator'
import KEY from '../key';
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducer/token";

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen ({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isSelected, setSelection] = useState(false);

  const token = useSelector((state) => state.token);


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if (value !== null) {
        // value previously stored
        console.log(value);
      } else {
        console.log(value);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
      console.log(e);
    }
  }
  const dispatch = useDispatch();
  const onLoginPressed = () => {
    // email 형식으로 입력 
    // const emailError = emailValidator(email.value)
    // const passwordError = passwordValidator(password.value)
    // if (emailError || passwordError) {
    //   setEmail({ ...email, error: emailError })
    //   setPassword({ ...password, error: passwordError })
    //   return
    // }

    let data = {
      "id": email.value,
      "pw": password.value
    }

    axios.post(`${KEY.server}/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // let data = await res.json();
      if (res.status === 200) {
        console.log("Login");
        // console.log(res.data.token);
        dispatch(setToken(res.data.token));
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })

        if (isSelected) {
          console.log('AutoLogin')
          storeData('token')
        }
      }
    })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log("아이디 혹은 비밀번호가 일치 하지 않습니다.");
        } else if (err.response.status === 500) {
          console.log("통신에 문제가 생겼습니다. 다시 시도해주세요.");
        }
      });
  }

  const onSignUpPressed = () => {
    console.log('SignUp');
    getData();
    navigation.replace('RegisterScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize="none"
      // autoCompleteType="email"
      // textContentType="emailAddress"
      // keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <CheckBox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
          checkedColor='#51cf66'
          title='keep me loged in'
          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0, marginLeft: 0 }}
          textStyle={{ color: theme.colors.primary, marginLeft: 0 }}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={onSignUpPressed}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  autoLogin: {
    width: '100%',
    alignItems: 'flex-start',
  },

  forgotPassword: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    marginTop: 3,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },


})