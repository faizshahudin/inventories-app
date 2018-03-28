import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

import { itemUpdate } from '../actions';

class ItemForm extends Component {
    render() {
        return (
            <View>
                <FormLabel>Category</FormLabel>
                <FormInput 
                    value={this.props.category}
                    onChangeText={value => this.props.itemUpdate({ prop: 'category', value })} 
                />
                <FormLabel>Name</FormLabel>
                <FormInput 
                    value={this.props.name}
                    onChangeText={value => this.props.itemUpdate({ prop: 'name', value })} 
                />
                <FormLabel>Description</FormLabel>
                <FormInput 
                    value={this.props.description}
                    onChangeText={value => this.props.itemUpdate({ prop: 'description', value })} 
                />
                <FormLabel>Price</FormLabel>
                <FormInput
                    value={this.props.price} 
                    onChangeText={value => this.props.itemUpdate({ prop: 'price', value })} 
                />
                <FormLabel>Quantity</FormLabel>
                <FormInput 
                    value={this.props.quantity}
                    onChangeText={value => this.props.itemUpdate({ prop: 'quantity', value })} 
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    const { category, name, description, price, quantity } = state.itemForm;

    return { category, name, description, price, quantity };
}

export default connect(mapStateToProps, { itemUpdate })(ItemForm);
