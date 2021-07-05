import React, { useCallback } from 'react';
import {
    StyleSheet, Text, SafeAreaView,
    View, ScrollView,
    TouchableOpacity
} from 'react-native';
import Maps from '../components/Maps';
import Slider from '../components/Slider';
export default function HomeScreen ({ navigation }) {

    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>

            <ScrollView contentContainerStyle={styles.listContainer}>
                <Maps />
                <Slider />
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

