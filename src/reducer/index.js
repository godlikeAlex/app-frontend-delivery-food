import {
    SET_LOCATION, 
    SET_CATEGORIES, 
    SET_CURRENT_CATEGORY, 
    SET_RESTAURANTS, 
    SET_RESTAURANT,
    SET_DISH
} from '../types';
import { SET_FILTER } from '../types/index';

const initalState = {
    location: JSON.parse(localStorage.getItem('location')) || {
        position: null,
        address: null
    },
    category: {
        current: 'all',
        categories: []
    },
    filters: {
        category: ''
    },
    restaurants: [],
    restaurant: {},
    dish: {
        options: []
    }
};

const locationReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_LOCATION: return {
            ...state,
            location: action.payload
        }
        case SET_CATEGORIES: return {
            ...state,
            category: {
                ...state.category,
                categories: action.payload
            }
        }
        case SET_CURRENT_CATEGORY: return {
            ...state,
            category: {
                ...state.category,
                current: action.payload
            }
        }
        case SET_FILTER: return {
            ...state,
            filters: action.payload
        }
        case SET_RESTAURANTS: return {
            ...state,
            restaurants: action.payload
        }
        case SET_RESTAURANT: return {
            ...state,
            restaurant: action.payload
        }
        case SET_DISH: return {
            ...state,
            dish: action.payload
        }
        default: return state;
    }
};

export {
    locationReducer
}