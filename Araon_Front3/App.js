import React from 'react'
import {
  StyleSheet, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducer";

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from './src/screens'

const store = createStore(rootReducer);
const Stack = createStackNavigator()

export default function App () {
  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="StartScreen"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </PaperProvider>
      </KeyboardAvoidingView>
    </SafeAreaView >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});