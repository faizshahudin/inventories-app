import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                // AsyncStorage.removeItem('fb_token'): test auth flow 
                this.props.facebookLogin();
                this.onAuthComplete(this.props);
                //AsyncStorage.removeItem('fb_token');
            }
        );
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('scan');
        }
    }

    render() {
        if (this.props.error) {
            return (
                <View>
                    <Text>{this.props.error}</Text>
                </View>
            );
        }
        return (
            <View />
        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token, error: auth.error };
}

export default connect(mapStateToProps, actions)(AuthScreen);
