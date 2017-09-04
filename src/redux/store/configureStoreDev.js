import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index.js';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import initialState from './initialState.js';

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )    
  );
}
