import React, { useCallback, useState, useEffect } from 'react';
import {
    StyleSheet, SafeAreaView,
    ScrollView,
    View, Text
} from 'react-native';
// import Maps from '../components/Maps';
import Slider from '../../components/Slider';
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../../reducer/token";
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import KEY from '../../key';
import axios from "axios";
export default function HomeScreen ({ route, navigation }) {
    const [imgs, setImgs] = useState([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios
                .get(`${KEY.server}/load`)
                .then((res) => {
                    var temp = [];
                    res.data.map((item, i) => {
                        temp.push(item.image.substr(5));
                    })
                    // console.log(temp);
                    setImgs(temp);
                })
                .catch((err) => {
                    console.error(err.response);
                });
        });
        return unsubscribe;
    }, [navigation]);

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.listContainer}>
                <Text>Home!</Text>
                <Button
                    mode="outlined"
                    onPress={onLogoutPressed}
                >
                    Logout
                </Button>
                {/* <Maps /> */}
                <Slider images={imgs} />
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1
    },
    listContainer: {
        alignItems: 'center',
    },
    scroll: {
        flex: 1
    },
    floatBtn: {
        width: 80,
        height: 80,
        paddingTop: 28,
        backgroundColor: 'red',
        borderRadius: 50,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    floatBtntext: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

});

