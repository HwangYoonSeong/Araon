import React, { useState, useEffect } from 'react';
import {
    Button, StyleSheet, Text,
    View, SafeAreaView, TextInput
} from 'react-native';
const UselessTextInput = props => {
    return (
        <TextInput
            {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            editable
            maxLength={100}
        />
    );
};
export default function Menu2Screen ({ navigation }) {
    const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
    useEffect(() => {
        console.log("Menu2");
    }, []);
    const print = () => {
        console.log(value);
    }
    const clear = () => {
        onChangeText('');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#3143e8', fontSize: 30 }}>Menu2 Screen</Text>
                <View
                    style={{
                        backgroundColor: value,
                        borderBottomColor: '#000000',
                        borderBottomWidth: 1,
                    }}>
                    <UselessTextInput
                        multiline
                        numberOfLines={4}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                </View>
                <View style={styles.btn}>
                    <Button
                        onPress={print}
                        title="PRINT"
                        color="white"
                    />

                </View>
                <View style={styles.btn}>
                    <Button
                        onPress={clear}
                        title="CLEAR"
                        color="white"
                    />

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn: {
        margin: 10,
        padding: 5,
        marginRight: 10,
        backgroundColor: '#3143e8',
        borderRadius: 50,

    },
});
