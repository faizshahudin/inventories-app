import _ from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Inventory App', color: '#2980b9' },
    { text: 'Use this to manage your inventory', color: '#1abc9c' },
    { text: 'Scan QR/Barcode, then customize your item', color: '#f1c40f' }
];

class WelcomeScreen extends Component {
    state = { token: null }

    async componentWillMount() {
        let token = await AsyncStorage.getItem('fb_token');

        if (token) {
            this.props.navigation.navigate('scan');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }
    
    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
