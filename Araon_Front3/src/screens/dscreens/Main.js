import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import KEY from '../../key';
import axios from "axios";
export default class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            serverImgs: []
        }
    }

    componentDidUpdate () {
        const { params } = this.props.route;
        if (params) {
            const { photos } = params;
            if (photos) this.setState({ photos });
            delete params.photos;
        }
    }

    renderImage (item, i) {
        return (
            <Image
                style={{ height: 200, width: 200, }}
                source={{ uri: item.uri }}
                key={i}
            />
        )
    }
    formdata_upload = () => {
        //form data 방식 base64 Image 전송 
        this.state.photos.reduce((prevPromise, item) => { // [A]

            const currentPromise = prevPromise.then(() => { // [B]
                var form = new FormData();
                form.append("image", `form/data:image/jpg;base64,${item.base64}`);
                return axios.post(`${KEY.server}/upload`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }).then((res) => {
                    // let data = await res.json();
                    console.log(res.status);
                })
                    .catch((err) => {
                        console.error(err);
                    }); // [C]
            });

            return currentPromise;

        }, Promise.resolve()) // [A]

    };

    json_upload = () => {
        //json 방식 base64 Image 전송 
        this.state.photos.reduce((prevPromise, item) => { // [A]
            let base64Img = `json/data:image/jpg;base64,${item.base64}`
            let data = {
                "image": base64Img,
            }
            const currentPromise = prevPromise.then(() => { // [B]
                return axios.post(`${KEY.server}/upload`, data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    // let data = await res.json();
                    console.log(res.status);
                })
                    .catch((err) => {
                        console.error(err);
                    }); // [C]
            });

            return currentPromise;

        }, Promise.resolve()) // [A]
    };


    render () {
        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{ flex: 1 }}>
                <Button
                    title="Open image browser"
                    onPress={() => { navigate('ImageBrowser'); }}
                />
                <Button
                    title="formdata_upload"
                    onPress={this.formdata_upload}
                />

                <Button
                    title="json_upload"
                    onPress={this.json_upload}
                />

                <View style={styles.images}>
                    <Text style={styles.title}>Image to upload</Text>
                    {this.state.photos.map((item, i) => this.renderImage(item, i))}
                </View>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        width: Dimensions.get('window').width,
        padding: 10,
        color: '#fff',
        fontSize: 36,
        fontWeight: '300',
        textAlign: 'center',
        backgroundColor: '#3143e8',
        marginTop: 20
    },
    images: {
        alignItems: 'center'
    },

});