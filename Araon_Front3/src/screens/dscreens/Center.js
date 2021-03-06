import React, { useState, useCallback } from 'react';
import {
    Button, StyleSheet, Text,
    View, SafeAreaView
} from 'react-native';

export default function CenterScreen ({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#3143e8', fontSize: 30 }}>Center Screen</Text>
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

