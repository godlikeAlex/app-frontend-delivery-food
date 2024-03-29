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
    SET_DISH_OPTIONS,
    SET_TOTAL_PRICE,
    ADD_TO_CART,
    INC_QUANTITY,
    DEC_QUANTITY,
    DELETE_FOOD,
    SHOW_LOGIN,
    SET_AUTH,
    SHOW_SUCCESS,
    SET_REORDER,
    CLEAR_CART,
    CURRENT_RESTAURANT,
    SET_ERROR,
    OPEN_LOCATION,
    SET_CURRENT_PRICE
} from '../types';
import { updateTokenInSocket } from '../components/core/socket';

export const setLocation = payload => {
    return {
        type: SET_LOCATION,
        payload
    }
}

export const setError = payload => {
    return {
        type: SET_ERROR,
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

export const setPrice = payload => {
    return {
        type: SET_TOTAL_PRICE,
        payload
    }
}

export const setCurrentPrice = payload => {
    return {
        type: SET_CURRENT_PRICE,
        payload
    }
}

export const addToCart = payload => {
    return {
        type: ADD_TO_CART,
        payload
    }
}

export const addQuantity = payload => {
    return {
        type: INC_QUANTITY,
        payload
    }
}

export const decQuantity = payload => {
    return {
        type: DEC_QUANTITY,
        payload
    }
}

export const deleteFood = payload => {
    return {
        type: DELETE_FOOD,
        payload
    }
}

export const showLogin = payload => {
    return {
        type: SHOW_LOGIN,
        payload
    }
}

export const setAuth = payload => {
    updateTokenInSocket(payload.token);
    return {
        type: SET_AUTH,
        payload
    }
}

export const showSuccess = payload => {
    return {
        type: SHOW_SUCCESS,
        payload
    }
}

export const setReOrder = payload => {
    return {
        type: SET_REORDER,
        payload
    }
}

export const setRestaurntnCurrent = payload => {
    return {
        type: CURRENT_RESTAURANT,
        payload
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const openLocation = payload => {
    return {
        type: OPEN_LOCATION,
        payload
    }
}