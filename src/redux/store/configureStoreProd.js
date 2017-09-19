import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import getInitialState from './initialState.js';

export default async function configureStore() {
  const initialState = await getInitialState();  
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
