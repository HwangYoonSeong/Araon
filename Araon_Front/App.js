import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import MapView from 'react-native-maps';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, Dimensions, ScrollView } from 'react-native';
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

  const onChangeInputs = e => {
    const { name, type, text } = e;
    let processedData = text;
    // 조건에 따른 value 변환

    setInputs({
      ...inputs,
      [name]: processedData,
    });
  }

  const addMarker = useCallback(
    () => {
      setMarkers([
        ...markers,
        { lat: inputs.lat, lng: inputs.lng },
      ]);
      console.log(markers);
      setInputs({});
    },
    [inputs]
  );

  return (
    <SafeAreaView style={styles.container}>
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
          </View>








        </ScrollView>

      </View>


    </SafeAreaView >
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