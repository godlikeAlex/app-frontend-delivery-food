import {SET_CATEGORIES, SET_LOCATION, SET_CURRENT_CATEGORY, SET_FILTER, SET_RESTAURANTS} from '../types';

export const setLocation = payload => {
    return {
        type: SET_LOCATION,
        payload
    }
}

export const setCategories = payload => {
    return {
        type: SET_CATEGORIES,
        payload
    }
};

export const setCurrentCategory = payload => {
    return {
        type: SET_CURRENT_CATEGORY,
        payload
    }
};

export const setFilters = payload => {
    return {
        type: SET_FILTER,
        payload
    }
};

export const setRestaurants = payload => {
    return {
        type: SET_RESTAURANTS,
        payload
    }
};