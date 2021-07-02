import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home.js'
import Detail from './screens/Detail.js'

const Stack = createStackNavigator();

export default function App () {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
            title: 'ARAON',

            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#000',
              height: 100

            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            },
          }} />
          <Stack.Screen name="Details" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>

    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },

});