import {ADD_TO_CART, SET_LOCATION} from '../types';

export const setLocation = payload => {
    return {
        type: SET_LOCATION,
        payload
    }
}

export const addToCart = payload => {
    return {
        type: ADD_TO_CART,
        payload
    }
};