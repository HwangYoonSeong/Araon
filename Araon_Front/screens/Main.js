import React, { Component } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import KEY from '../key';
import axios from "axios";
export default class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            serverImg: 'serverImg'
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
                style={{ height: 100, width: 100 }}
                source={{ uri: item.uri }}
                key={i}
            />
        )
    }
    upload = () => {

        // //form data 방식 base64 Image 전송 
        // var form = new FormData();
        // form.append("image", `data:image/gif;base64,${this.state.photos[0].base64}`);

        // axios
        //     .post(`${KEY.server}/upload`, form, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res.data)
        //     })
        //     .catch((err) => {
        //         console.error(err.response);
        //     });

        let base64Img = `data:image/jpg;base64,${this.state.photos[0].base64}`
        let data = {
            "image": base64Img,
        }

        //json 방식 base64 Image 전송 
        axios
            .post(`${KEY.server}/upload`, data, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                // let data = await res.json();
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    load = () => {
        axios
            .get(`${KEY.server}/load`)
            .then((res) => {
                console.log(res.data[0].image)
                this.setState({ serverImg: res.data[0].image });
            })
            .catch((err) => {
                console.error(err.response);
            });
    };

    render () {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <Button
                    title="Open image browser"
                    onPress={() => { navigate('ImageBrowser'); }}
                />
                <Button
                    title="Upload"
                    onPress={this.upload}
                />

                <Button
                    title="load"
                    onPress={this.load}
                />

                <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: this.state.serverImg }}
                />

                <ScrollView>
                    {this.state.photos.map((item, i) => this.renderImage(item, i))}
                </ScrollView>
            </View>
        );
    }
}