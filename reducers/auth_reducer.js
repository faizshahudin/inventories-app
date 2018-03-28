import { 
    FACEBOOK_LOGIN_SUCCESS, 
    FACEBOOK_LOGIN_FAIL,
    FIREBASE_SIGN_IN_FAIL
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { token: action.payload };
        case FACEBOOK_LOGIN_FAIL:
            return { token: null };
        case FIREBASE_SIGN_IN_FAIL:
            return { token: null, error: action.payload };
        default:
            return state;
    }
}
