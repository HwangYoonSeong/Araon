import React, { useCallback, useState, useEffect } from 'react';
import {
    StyleSheet, SafeAreaView,
    ScrollView,
    View, Text
} from 'react-native';
// import Maps from '../components/Maps';
import Slider from '../../components/Slider';

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


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.listContainer}>
                {/* <Maps /> */}
                <Slider images={imgs} />
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    listContainer: {
        alignItems: 'center',
    }


});

