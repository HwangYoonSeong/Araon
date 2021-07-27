import React, { useState, useEffect } from 'react';
import {
    Button, StyleSheet, Text,
    View, SafeAreaView
} from 'react-native';

export default function Menu2Screen ({ navigation }) {
    useEffect(() => {
        console.log("Menu2");
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#3143e8', fontSize: 30 }}>Menu2 Screen</Text>
                <Button
                    title="Go to Details... again"
                    onPress={() => navigation.push('Details')}
                />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />

            </View>
        </SafeAreaView>
    );
}

