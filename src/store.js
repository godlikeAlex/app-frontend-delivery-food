import {createStore, applyMiddleware} from 'redux';
import {locationReducer} from './reducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(locationReducer, composeWithDevTools(applyMiddleware(logger)))

export default store;