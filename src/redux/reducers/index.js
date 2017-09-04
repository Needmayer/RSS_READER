import {combineReducers} from 'redux';
import loginUser from './authReducer.js';
import items from './tabReducer.js';


const rootReducer = combineReducers({
    loginUser,
    items
});

export default rootReducer;