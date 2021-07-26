import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView, View, TouchableOpacity, Text
} from 'react-native';

import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
// import KEY from '../key';
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../reducer/token";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './dscreens/Home.js'
import Menu1 from './dscreens/Menu1.js'
import Center from './dscreens/Center.js'
import Menu2 from './dscreens/Menu2.js'
import Profile from './dscreens/Profile.js'

export default function Dashboard ({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={({ route, navigation }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Center') {
          return <TouchableOpacity
            onPress={() => {
              navigation.navigate('Center')
            }}
            activeOpacity={.5}
            style={styles.floatBtn}  >
            <Text style={{ color: focused ? '#3143e8' : '#868e96' }}><Ionicons
              name={'search'} style={styles.floatBtntext} /></Text>
          </TouchableOpacity>;
        } else {
          if (route.name === 'Home') iconName = focused ? 'ios-home' : 'ios-home-outline';
          else if (route.name === 'Menu1') iconName = focused ? 'ios-images' : 'ios-images-outline';
          else if (route.name === 'Center') iconName = focused ? 'radio-button-on' : 'radio-button-on-outline';
          else if (route.name === 'Menu2') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person-circle' : 'person-circle-outline';
          return <Ionicons
            name={iconName} size={size} color={color} />;
        }
      },
    })}

      tabBarOptions={{
        activeTintColor: '#3143e8',
        inactiveTintColor: 'gray',
        showLabel: false,
        onTabPress: () => { console.log("Move1") }
      }}>

      <Tab.Screen name="Home" component={Home} options={{
        title: 'Home', tabBarBadge: 3
      }} />
      <Tab.Screen name="Menu1" component={Menu1} />
      <Tab.Screen name="Center" component={Center} />
      <Tab.Screen name="Menu2" component={Menu2} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>

  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  floatBtn: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
    paddingLeft: 11,
    paddingTop: 10,

    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    backgroundColor: '#fff',

  },

  floatBtntext: {
    fontSize: 40
  },

});