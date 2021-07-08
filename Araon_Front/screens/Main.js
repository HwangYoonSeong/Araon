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
    formdata_upload = () => {
        //form data 방식 base64 Image 전송 
        var form = new FormData();
        form.append("image", `form/data:image/jpg;base64,${this.state.photos[0].base64}`);

        axios
            .post(`${KEY.server}/upload`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res.status)
            })
            .catch((err) => {
                console.error(err.response);
            });

    };

    json_upload = () => {
        //json 방식 base64 Image 전송 
        let base64Img = `json/data:image/jpg;base64,${this.state.photos[0].base64}`
        let data = {
            "image": base64Img,
        }
        axios
            .post(`${KEY.server}/upload`, data, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                // let data = await res.json();
                console.log(res.status);
            })
            .catch((err) => {
                console.error(err);
            });

    };
    load = () => {
        axios
            .get(`${KEY.server}/load`)
            .then((res) => {
                this.setState({ serverImg: res.data[0].image.substr(5) });
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
                    title="formdata_upload"
                    onPress={this.formdata_upload}
                />

                <Button
                    title="json_upload"
                    onPress={this.json_upload}
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