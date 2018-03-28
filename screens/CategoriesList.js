import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { List, ListItem, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class CategoriesList extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Categories',
        headerRight: 
            <Button
                /*icon={
                    <Icon 
                        name="favorite" 
                        size={30} 
                        color="rgba(0,122,255,1)" 
                    />
                }*/
                title="Add Item"
                onPress={() => navigation.navigate('add')}
                backgroundColor="rgba(0,0,0,0)"
                color="rgba(0,122,255,1)"
            />
    });
    
    componentWillMount() {
        this.props.categoriesFetch();
        console.log('afterCategoriesFetch');
        this.createDataSource(this.props);
    }
    
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ categories }) {
        const ds = new List.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(categories);
        console.log(this.dataSource);
    }

    renderRow() {
        return;
    }
    
    render() {
        /*
        return (
            <List>
                <Text>category</Text>
                <Text>category</Text>
                <Text>category</Text>
            </List>
        );
        */
        return (
            <List>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    const categories = _.map(state.categories, (val, uid) => {
        console.log(categories);
        return { ...val, uid };
    });

    return { categories };
};

export default connect(mapStateToProps, actions)(CategoriesList);
