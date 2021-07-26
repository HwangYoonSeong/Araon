import React, { useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import KEY from '../key';
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';
export default function StartScreen ({ navigation }) {

  useEffect(() => { // AsyncStorage에 Token이 존재 시 자동 로그인 요청 
    autoLogin();
    console.log("StartScreen");
  }, []);

  const autoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('@storage_Key')
      if (token) { //token이 존재할 경우 verifyToken
        axios
          .get(`${KEY.server}/verifytoken`, {
            headers: {
              token: token
            },
          })
          .then((res) => {
            console.log(res.data);
            navigation.replace('Dashboard')
          })
          .catch((err) => {
            if (err.response.status === 401) {
              alert("세션이 만료되어 홈 화면으로 이동합니다.");
            }
          });
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  }

  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
