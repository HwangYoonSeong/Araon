import React, { useState, useEffect } from 'react';
import {
    StyleSheet, ScrollView,
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
        <ScrollView contentContainerStyle={styles.listContainer}>
            {/* <Maps /> */}
            <Slider images={imgs} />
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    }

});

