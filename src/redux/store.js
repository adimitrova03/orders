import {createStore, applyMiddleware} from 'redux';  
import rootReducer from './reducers';  
import thunk from 'redux-thunk';

export default function store() {  
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}