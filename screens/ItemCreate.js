import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import * as actions from '../actions';
import ItemForm from '../components/ItemForm';

class ItemCreate extends Component {
    onButtonPress() {
        const { category, name, description, price, quantity } = this.props;

        this.props.itemCreate({ category, name, description, price, quantity });
    }
    /*
    renderQRCode = () => {
        if (this.state.showQRCode) {
            return (
                <QRCode
                    value={this.props.category + this.props.name + this.props.price}
                    size={200}
                    bgColor='black'
                    fgColor='white'
                />
            );
        }

        return;
    }
    */

    render() {
        return (
            <ScrollView>
                <Card>
                <ItemForm {...this.props} />
                <View>
                    <Button 
                        title="Save Item"
                        raised
                        containerViewStyle={{ marginTop: 20 }}
                        buttonStyle={{ backgroundColor: '#3498db' }} 
                        onPress={this.onButtonPress.bind(this)}
                    />
                </View>
            </Card>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const { category, name, description, price, quantity } = state.itemForm;
    
    return { category, name, description, price, quantity };
}

export default connect(mapStateToProps, actions)(ItemCreate);
