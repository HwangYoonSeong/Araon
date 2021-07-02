import React, { useState, useCallback } from 'react';

import MapView from 'react-native-maps';
import axios from "axios";
import {
    Button, SafeAreaView, StyleSheet, Text,
    TextInput, View, Dimensions, ScrollView,
    KeyboardAvoidingView, Image, TouchableOpacity
} from 'react-native';


import Markers from '../components/Markers';
import Slick from 'react-native-slick';
import cat from '../assets/cat.png';
import dog from '../assets/dog.png';
import quokka from '../assets/default.jpg';
const MyTextInput = ({ value, name, type, onChange, placeholder }) => {
    return (
        <TextInput
            value={value}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={'#999'}
            onChangeText={text => onChange({ name, type, text })}
        />
    );
};

export default function HomeScreen ({ navigation }) {
    const [markers, setMarkers] = useState([]);
    const [inputs, setInputs] = useState({
        lat: '',
        lng: '',
    });

    const [address, setaddress] = useState('');

    const onChangeAddress = Inputaddr => {
        setaddress(Inputaddr);
    };

    const convertToCorp = useCallback(
        () => {
            axios
                .get(`http://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
                    {
                        headers: {
                            Authorization: "KakaoAK REST_API_KEY"
                        }
                    })
                .then((response) => {
                    var corp = response.data.documents[0];
                    console.log(response.data.documents[0]);
                    setMarkers([
                        ...markers,
                        { lat: corp.y, lng: corp.x },

                    ]);

                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [address]
    );

    const onChangeInputs = e => {
        const { name, type, text } = e;
        // 조건에 따른 value 변환

        setInputs({
            ...inputs,
            [name]: text,
        });
    }

    const addMarker = useCallback(
        () => {
            setMarkers([
                ...markers,
                { lat: inputs.lat, lng: inputs.lng },
            ]);
            setInputs({});
        },
        [inputs]
    );

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
                        <View style={styles.mapContainer}>
                            <Text style={styles.gmapTitle}>Apple Map</Text>


                            <MapView style={styles.map}
                                initialRegion={{
                                    latitude: 36.151416776192065,
                                    longitude: 128.44983188999225,
                                    latitudeDelta: 1,
                                    longitudeDelta: 1,
                                }}
                            >

                                <Markers markers={markers} />

                            </MapView>

                            <View style={styles.inputContainer}>
                                <MyTextInput
                                    name="lat"
                                    type="number"
                                    placeholder="Lat"
                                    onChange={onChangeInputs}
                                    value={inputs.lat}
                                    autoCorrect={false}
                                />

                                <MyTextInput
                                    name="lng"
                                    type="number"
                                    placeholder="Lng"
                                    onChange={onChangeInputs}
                                    value={inputs.lng}
                                    autoCorrect={false}
                                />

                                <View style={styles.addBtn}>
                                    <Button
                                        onPress={addMarker}
                                        title="ADD"
                                        color="white"
                                    />

                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    placeholderTextColor={'#999'}
                                    onChangeText={onChangeAddress}
                                    value={address}
                                    autoCorrect={false}
                                />

                                <View style={styles.addBtn}>
                                    <Button
                                        onPress={convertToCorp}
                                        title="ADD"
                                        color="white"
                                    />

                                </View>
                            </View>
                        </View>

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
    mapContainer: {
        flex: 1
    },
    scroll: {
        flex: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 1,
        fontSize: 24,
        marginLeft: 20,
    },
    addBtn: {
        padding: 5,
        marginRight: 10,
        backgroundColor: '#3143e8',
        borderRadius: 50,

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

