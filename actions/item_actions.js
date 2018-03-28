import firebase from 'firebase';
import {
    ITEM_UPDATE,
    ITEM_CREATE,
    CATEGORIES_FETCH_SUCCESS
} from './types';

export const itemUpdate = ({ prop, value }) => {
    return {
        type: ITEM_UPDATE,
        payload: { prop, value }
    };
};

export const itemCreate = ({ category, name, description, price, quantity }) => {
    const { currentUser } = firebase.auth();
    console.log('userUid: ', currentUser.uid);
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/${category}`)
            .push({ category, name, description, price, quantity })
            .then(() => {
                dispatch({ type: ITEM_CREATE });
            });
    };
};

export const categoriesFetch = () => {
    const { currentUser } = firebase.auth();
    console.log('userUid: ', currentUser.uid);
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
                dispatch({ type: CATEGORIES_FETCH_SUCCESS, payload: snapshot.val() });
            });
        console.log('userUid: ', currentUser.uid);
    };
};
