import {
    CAMERA_PERMISSIONS_GRANTED,
    CAMERA_PERMISSIONS_FAIL,
    STORE_BARCODE
} from '../actions/types';

const INITIAL_STATE = {
    cameraPermissions: null,
    barcodeType: '',
    barcodeData: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case CAMERA_PERMISSIONS_GRANTED:
            return { cameraPermissions: 'Granted' };
        case CAMERA_PERMISSIONS_FAIL:
            return { cameraPermissions: 'Failed' };
        case STORE_BARCODE:
            return { ...state, barcodeData: action.payload.data, barcodeType: action.payload.type };
        default: 
            return state;
    }
}
