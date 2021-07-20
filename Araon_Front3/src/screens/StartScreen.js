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

  // 지금 이상황은 뭐지 생성은 아니고 조회에 가까운데 사실 
  // user data 에 token이 저장되는건 아니고 local에 있는 token으로 서버에 요청해서 
  // 
  const autoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('@storage_Key')
      if (token) { //token이 존재할 경우 
        console.log(token);
        navigation.navigate('Dashboard')
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
