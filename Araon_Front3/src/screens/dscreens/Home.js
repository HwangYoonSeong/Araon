import React, { useState, useEffect } from 'react';
import {
    StyleSheet, ScrollView, Text, View, TextInput, Button
} from 'react-native';
// import Maps from '../components/Maps';
import Slider from '../../components/Slider';
import Header from '../../components/Header'

import KEY from '../../key';
import axios from "axios";
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function HomeScreen ({ route, navigation }) {
    const [imgs, setImgs] = useState([]);
    const [title, setTitle] = useState('Mega Coffee');
    const [numStars, setStars] = useState(5);
    // const [intro, setIntro] = useState(" ");

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

    const stars = (numStars) => {
        const res = [];
        for (let i = 0; i < numStars; i++) {
            res.push(<Text key={i} style={styles.star}>⭐</Text>);
        }
        return res;
    }


    return (
        <ScrollView contentContainerStyle={styles.listContainer}>
            {/* <Maps /> */}
            <Slider images={imgs} />

            <View style={styles.header}>

                <Text style={styles.title}>{title}</Text>
                <Text>
                    {stars(numStars)}
                </Text>
                <View
                    style={{
                        borderBottomColor: '#dee2e6',
                        borderBottomWidth: 1,
                        width: '100%',
                        marginTop: 15
                    }}
                />
                <View style={styles.subTitle}>

                    <Ionicons
                        name='call' size={20} > 전화</Ionicons>
                    <Ionicons
                        name='heart' size={20} > 찜</Ionicons>
                    <Ionicons
                        name='share-outline' size={20} > 공유</Ionicons>
                </View>
            </View>

            <View style={styles.contents}>
                {/* <Text style={styles.intro}>{intro}</Text> */}

                <Text style={styles.contentText}>
                    금오공대 교내 전체 기숙사 및 학교 앞 원룸만{"\n"}
                    6000원이상 무료배달{"\n"}
                    {"\n"}
                    참고로 6천원이상 무료 배달 서비스는{"\n"}
                    평일&주말-교내/원룸 건물 밑으로 내려와주셔야하니{"\n"}
                    휴대폰 연락 꼭 받아주세요
                </Text>



                {/* <Text>메뉴판</Text>
                <Text>위치</Text> */}
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    listContainer: {
    },
    header: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: -20,
        marginHorizontal: 10
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
    subTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        width: '100%',
    },
    intro: {
        padding: 15
    },

    contents: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        margin: 10,
        padding: 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 24,
        width: '100%',
    },
    postInput: {
        fontSize: 24,
        borderColor: '#42435b',
        borderWidth: 1,
        margin: 10,
    },
    btn: {
        padding: 5,
        marginRight: 10,
        backgroundColor: '#3143e8',
        borderRadius: 50,

    },
    contentText: {
        width: '100%'
    }
});

