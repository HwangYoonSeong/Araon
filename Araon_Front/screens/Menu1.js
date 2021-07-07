import React, { useEffect, useState } from 'react';
import KEY from '../key';
import axios from "axios";
import {
    Button, Text, View, SafeAreaView, TextInput, Image
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Main from './Main';
import ImageBrowser from './ImageBrowser';

const Stack = createStackNavigator();
export default function Menu1Screen () {
    // useEffect(() => {
    //     console.log("Hello")
    //     axios
    //         .get(`${KEY.server}/test`)
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch((err) => {
    //             console.error(err.response);
    //         });
    // }, []);

    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <NavigationContainer independent={true}>
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
            </NavigationContainer>

        </SafeAreaView>
    );
}

