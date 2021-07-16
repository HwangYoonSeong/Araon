import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
// import KEY from '../key';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducer/token";

export default function Dashboard ({ navigation }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onLogoutPressed = () => {
    //local or session storage에 있는 token 제거 

    console.log(token);
    dispatch(setToken(''));
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })

  }

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={onLogoutPressed}
      >
        Logout
      </Button>
    </Background>
  )
}
