import React, { useState, useEffect } from 'react';
import {
    StyleSheet, Text,
    View, SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../../reducer/token";
import Button from '../../components/Button'

export default function ProfileScreen ({ navigation }) {
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Pofile");
    }, []);
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            console.log(value);

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

    const onLogoutPressed = () => {
        //local or session storage에 있는 token 제거 
        getData();
        console.log(token);
        dispatch(setToken('')); // Session Token 삭제 
        storeData('') // Local Token 삭제 
        navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#3143e8', fontSize: 30 }}>Profile Screen</Text>
                <Button
                    mode="outlined"
                    onPress={onLogoutPressed}
                >
                    Logout
                </Button>

            </View>
        </SafeAreaView>
    );
}

