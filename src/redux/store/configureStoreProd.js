import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import getInitialState from './initialState.js';

export default async function configureStore(callback) {
  const initialState = await getInitialState();  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  callback(store);
  return;
}
