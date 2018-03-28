import Expo from 'expo';
import React from 'react';
import * as firebase from 'firebase';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import CategoriesList from './screens/CategoriesList';
import ScanScreen from './screens/ScanScreen';
import ItemCreate from './screens/ItemCreate';
import ItemDetail from './screens/ItemDetail';
import ItemEdit from './screens/ItemEdit';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
        apiKey: 'AIzaSyCEMlnRnbhKUakITjPS1wY806UMuUBP4j8',
        authDomain: 'inventories-1d250.firebaseapp.com',
        databaseURL: 'https://inventories-1d250.firebaseio.com',
        projectId: 'inventories-1d250',
        storageBucket: 'inventories-1d250.appspot.com',
        messagingSenderId: '551421860402'
      };
    
    firebase.initializeApp(config);
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          scan: { screen: ScanScreen },
          categories: {
            screen: StackNavigator({
              categories: { screen: CategoriesList },
              add: { screen: ItemCreate },
              detail: { 
                screen: StackNavigator({
                  detail: { screen: ItemDetail },
                  edit: { screen: ItemEdit }
                })
              }
            })
           }
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
