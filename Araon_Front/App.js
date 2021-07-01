import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import MapView from 'react-native-maps';
import axios from "axios";
import {
  Button, SafeAreaView, StyleSheet, Text,
  TextInput, View, Dimensions, ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Markers from './components/Markers';

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

export default function App () {
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
              Authorization: "KakaoAK REST_APIKEY"
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.scroll}>
          <ScrollView contentContainerStyle={styles.listContainer}>
            <View style={styles.mapContainer}>
              <Text style={styles.gmapTitle}>Google Map</Text>


              <MapView style={styles.map}
                initialRegion={{
                  latitude: 36.151416776192065,
                  longitude: 128.44983188999225,
                  latitudeDelta: 5,
                  longitudeDelta: 5,
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

                <View style={styles.button}>
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

                <View style={styles.button}>
                  <Button
                    onPress={convertToCorp}
                    title="ADD"
                    color="white"
                  />

                </View>
              </View>
            </View>


          </ScrollView>

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
  button: {
    padding: 5,
    marginRight: 10,
    backgroundColor: '#3143e8',
    borderRadius: 50,

  },
});