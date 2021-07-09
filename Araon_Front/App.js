import React, { useEffect } from 'react';
import KEY from './key';
import axios from "axios";
import {
  StyleSheet,
  KeyboardAvoidingView, View, TouchableOpacity
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Home from './screens/Home.js'
import Menu1 from './screens/Menu1.js'
import Center from './screens/Center.js'
import Menu2 from './screens/Menu2.js'
import Profile from './screens/Profile.js'

const Tab = createBottomTabNavigator();
export default function App () {

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <NavigationContainer>
          <Tab.Navigator screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Center') {
                return <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Center')
                  }}
                  activeOpacity={.5}
                  style={styles.floatBtn}>
                  <View style={styles.floatBtntext}></View>
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

        </NavigationContainer>

      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1
  },
  floatBtn: {
    width: 80,
    height: 80,
    backgroundColor: '#3143e8',
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    paddingLeft: 15,
    paddingTop: 16
  },

  floatBtntext: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
  },

});