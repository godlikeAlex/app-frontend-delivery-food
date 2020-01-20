import {createStore, applyMiddleware} from 'redux';
import {locationReducer} from './reducer';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(locationReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)))

export default store;