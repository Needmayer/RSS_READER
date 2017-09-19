import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index.js';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import getInitialState from './initialState.js';



export default async function configureStore(callback) {
  const initialState = await getInitialState();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )    
  );
  callback(store);
  return;
}
