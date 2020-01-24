import {
    SET_CATEGORIES, 
    SET_LOCATION, 
    SET_CURRENT_CATEGORY, 
    SET_FILTER, 
    SET_RESTAURANTS, 
    SET_RESTAURANT, 
    SET_DISH,
    LOAD_MORE_RESTAURANTS,
    SET_LOAD_MORE_DATA,
    SET_DISH_OPTIONS
} from '../types';

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

export const setLoadMoreData = payload => {
    return {
        type: SET_LOAD_MORE_DATA,
        payload
    }
};

export const setDishOptions = payload => {
    return {
        type: SET_DISH_OPTIONS,
        payload
    }
};

export const setRestaurants = payload => {
    return {
        type: SET_RESTAURANTS,
        payload
    }
};

export const loadMoreRestaurants = payload => {
    return {
        type: LOAD_MORE_RESTAURANTS,
        payload
    }
};


export const setRestaurant = payload => {
    return {
        type: SET_RESTAURANT,
        payload
    }
};

export const setDish = payload => {
    return {
        type: SET_DISH,
        payload
    }
};