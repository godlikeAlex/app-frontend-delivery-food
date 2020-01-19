import {SET_LOCATION} from '../types';

const initalState = {
    location: JSON.parse(localStorage.getItem('location')) || {
        position: null,
        address: null
    }
};

const locationReducer = (state = initalState, action) => {
    console.log(action);
    switch(action.type) {
        case SET_LOCATION: return {
            ...state,
            location: action.payload
        }
        default: return state;
    }
};

export {
    locationReducer
}