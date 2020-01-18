import {createStore} from 'redux';
import {locationReducer} from './reducer';

const store = createStore(locationReducer)

export default store;