// components/TodoList.js
import React, { useState, useCallback } from 'react';

import axios from "axios";
import {
    Button, StyleSheet, Text,
    TextInput, View, Dimensions,

} from 'react-native';

// import MapView from 'react-native-maps';
import MapView from "react-native-map-clustering";
// import Markers from './Markers';
import { Marker } from 'react-native-maps';

import KEY from '../key';

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

const Maps = () => {

    const [markers, setMarkers] = useState([]);
    const [inputs, setInputs] = useState({
        lat: '',
        lng: '',
    });

    const [location, setLocation] = useState({
        latitude: 36.151416776192065,
        longitude: 128.44983188999225,
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
                            Authorization: `KakaoAK ${KEY.kakao}`
                        }
                    })
                .then((response) => {
                    var cord = response.data.documents[0];
                    // console.log(response.data.documents[0]);
                    setMarkers([
                        ...markers,
                        { lat: cord.y, lng: cord.x },

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
    return (

        <View style={styles.mapContainer}>
            <Text style={styles.title}>Apple Map</Text>

            <MapView style={styles.map}
                initialRegion={{
                    latitude: 36.151416776192065,
                    longitude: 128.44983188999225,
                    latitudeDelta: 1,
                    longitudeDelta: 1,

                }}
                // onRegionChange={region => {
                //     // setLocation({
                //     //     latitude: region.latitude,
                //     //     longitude: region.longitude,
                //     // });

                //     console.log(region.latitude, region.longitude);
                // }}
                onRegionChangeComplete={region => {
                    setLocation({
                        latitude: region.latitude,
                        longitude: region.longitude,
                    });

                    console.log('complete', region.latitude, region.longitude);
                }}
                minZoomLevel={11}
                maxZoom={13}
                clusterColor={'#3143e8'}
                animationEnabled={false}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    title="this is a marker"
                    description="this is a marker example"
                />
                {/* <Markers markers={markers} /> */}
                <Marker coordinate={{ latitude: 36.151416776192065, longitude: 128.44983188999225 }} />
                <Marker coordinate={{ latitude: 36.1512, longitude: 128.443 }} />
                <Marker coordinate={{ latitude: 36.1485, longitude: 128.441 }} />
                <Marker coordinate={{ latitude: 36.1482, longitude: 128.443 }} />
                <Marker coordinate={{ latitude: 36.148, longitude: 128.442 }} />
                <Marker coordinate={{ latitude: 36.149, longitude: 128.445 }} />

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

        </View >



    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    mapContainer: {
        flex: 1
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width,
    },
    title: {
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
        color: "#fff"
    },
    addBtn: {
        padding: 5,
        marginRight: 10,
        backgroundColor: '#3143e8',
        borderRadius: 50,

    },

});

export default Maps;