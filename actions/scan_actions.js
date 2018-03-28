import { Permissions } from 'expo';
import {
    CAMERA_PERMISSIONS_GRANTED,
    CAMERA_PERMISSIONS_FAIL,
    STORE_BARCODE
} from './types';

export const requestCameraPermission = () => async dispatch => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status) {
        dispatch({ type: CAMERA_PERMISSIONS_GRANTED });
    } else {
        dispatch({ type: CAMERA_PERMISSIONS_FAIL });
    }
};

export const storeBarcode = result => async dispatch => {
    dispatch({ type: STORE_BARCODE, payload: result });
};
