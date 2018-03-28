import { combineReducers } from 'redux';
import auth from './auth_reducer';
import scan from './scan_reducer';
import itemForm from './item_form_reducer';
import categories from './category_reducer';

export default combineReducers({
    auth, scan, itemForm, categories
});
