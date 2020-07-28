import { combineReducers } from 'redux';
import addressReducer from './address.reducer';
import translateReducer from './translate.reducer';

export default  combineReducers({
    translateReducer,
    addressReducer,
});