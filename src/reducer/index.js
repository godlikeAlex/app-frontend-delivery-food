import {ADD_TO_CART} from '../types';

const initalState = {
    location: null
};

const locationReducer = (state = initalState, action) => {
    switch(action.type) {
        case ADD_TO_CART: return {
            ...state,
            location: state.location
        }
        default: return state;
    }
};

export {
    locationReducer
}