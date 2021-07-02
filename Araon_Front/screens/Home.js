import React, { useCallback } from 'react';
import {
    StyleSheet, Text,
    View, ScrollView,
    TouchableOpacity
} from 'react-native';

import Maps from '../components/Maps';
import Slider from '../components/Slider';

export default function HomeScreen ({ navigation }) {

    const floatBtnHandler = useCallback(
        () => {
            navigation.navigate('Details')
        },
        []
    );

    return (

        <View style={styles.scroll}>
            <ScrollView contentContainerStyle={styles.listContainer}>
                <Maps />
                <Slider />
            </ScrollView>
            <TouchableOpacity
                onPress={floatBtnHandler}
                activeOpacity={.5}
                style={styles.floatBtn}>
                <Text style={styles.floatBtntext}>Float</Text>
            </TouchableOpacity>

        </View>
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

