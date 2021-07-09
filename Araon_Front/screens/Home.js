import React, { useCallback, useState, useEffect } from 'react';
import {
    StyleSheet, SafeAreaView,
    ScrollView,
    Button
} from 'react-native';
import Maps from '../components/Maps';
import Slider from '../components/Slider';
import KEY from '../key';
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


    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <ScrollView contentContainerStyle={styles.listContainer}>
                <Maps />
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

