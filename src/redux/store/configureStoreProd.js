import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import initialState from './initialState.js';

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
