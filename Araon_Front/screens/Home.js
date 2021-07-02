import React, { useState, useCallback } from 'react';


import {
    Button, SafeAreaView, StyleSheet, Text,
    TextInput, View, Dimensions, ScrollView,
    KeyboardAvoidingView, Image, TouchableOpacity
} from 'react-native';


import Maps from '../components/Maps';

import Slick from 'react-native-slick';
import cat from '../assets/cat.png';
import dog from '../assets/dog.png';
import quokka from '../assets/default.jpg';



export default function HomeScreen ({ navigation }) {


    const floatBtnHandler = useCallback(
        () => {
            navigation.navigate('Details')
        },
        []
    );

    const items = [
        { id: 1, url: cat },
        { id: 2, url: dog },
        { id: 3, url: quokka },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.scroll}>
                    <ScrollView contentContainerStyle={styles.listContainer}>
                        <Maps />
                        <Text style={styles.gmapTitle}>Slick Slider</Text>

                        <Slick style={styles.wrapper}
                            showsButtons={true}
                            activeDotColor={'#3143e8'}
                            dotColor={'white'}
                            autoplay={false}
                            nextButton={<Text style={styles.buttonText}>›</Text>}
                            prevButton={<Text style={styles.buttonText}>‹</Text>}>

                            {items.map(item => {
                                return (
                                    <View key={item.id}>
                                        <Image style={styles.img} source={item.url} />
                                    </View>
                                );
                            })}
                        </Slick>


                    </ScrollView>
                    <TouchableOpacity
                        onPress={floatBtnHandler}
                        activeOpacity={.5}
                        style={styles.floatBtn}>
                        <Text style={styles.floatBtntext}>Float</Text>
                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    listContainer: {
        alignItems: 'center',
    },
    scroll: {
        flex: 1
    },
    gmapTitle: {
        width: Dimensions.get('window').width,
        padding: 10,
        color: '#fff',
        fontSize: 36,
        fontWeight: '300',
        textAlign: 'center',
        backgroundColor: '#3143e8',
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
    wrapper: {
        height: 300
    },

    img: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'

    },
    buttonText: {
        color: '#3143e8',
        fontSize: 60
    }
});

