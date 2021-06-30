// components/TodoList.js
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
const Markers = ({ markers }) => {
    return (
        <>
            {
                markers.map((marker, i) =>
                (
                    <MapView.Marker
                        key={i}
                        coordinate={{
                            latitude: (marker.lat * 1),
                            longitude: (marker.lng * 1),
                        }} />

                )

                )}


        </>

    );
};

const styles = StyleSheet.create({

});

export default Markers;