// components/TodoList.js
import React from 'react';

import {
    StyleSheet, Text,
    View, Image, Dimensions, Button
} from 'react-native';

import Slick from 'react-native-slick';
import cat from '../assets/cat.png';
import dog from '../assets/dog.png';
import quokka from '../assets/default.jpg';


const Slider = ({ images }) => {
    const items = [
        { id: 1, url: cat },
        { id: 2, url: dog },
        { id: 3, url: quokka },
    ];

    return (
        <>
            <Text style={styles.title}>Slick Slider</Text>
            <Slick style={styles.wrapper}
                showsButtons={true}
                activeDotColor={'#3143e8'}
                dotColor={'white'}
                autoplay={false}
                nextButton={<Text style={styles.buttonText}>›</Text>}
                prevButton={<Text style={styles.buttonText}>‹</Text>}>

                {images.length ? (images.map((image, i) => {
                    return (
                        <View key={i}>
                            <Image style={styles.img} source={{ uri: image }} />
                        </View>
                    );
                })) : (items.map((item, i) => {
                    return (
                        <View key={item.id}>
                            <Image style={styles.img} source={item.url} />
                        </View>
                    );
                }))}
            </Slick>

        </>
    );
};

const styles = StyleSheet.create({
    title: {
        width: Dimensions.get('window').width,
        padding: 10,
        color: '#fff',
        fontSize: 36,
        fontWeight: '300',
        textAlign: 'center',
        backgroundColor: '#3143e8',
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

export default Slider;