import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// import Main from './Main';
// import ImageBrowser from './ImageBrowser';

const Stack = createStackNavigator();
export default function Menu1Screen ({ navigation }) {
    useEffect(() => {
        console.log("Menu1");
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <NavigationContainer independent={true}>
                <Stack.Navigator initialRouteName='Main'>
                    <Stack.Screen name='Main' component={Main} />
                    <Stack.Screen
                        name='ImageBrowser'
                        component={ImageBrowser}
                        options={{
                            title: 'Selected 0 files',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer> */}

        </SafeAreaView>
    );
}

