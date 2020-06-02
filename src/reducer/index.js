import {
    ADD_TO_CART,
    SET_LOCATION, 
    SET_CATEGORIES, 
    SET_CURRENT_CATEGORY, 
    SET_RESTAURANTS, 
    SET_RESTAURANT,
    SET_DISH,
    LOAD_MORE_RESTAURANTS,
    SET_LOAD_MORE_DATA,
    SET_DISH_OPTIONS,
    SET_TOTAL_PRICE,
    INC_QUANTITY,
    DEC_QUANTITY,
    DELETE_FOOD,
    SHOW_LOGIN,
    SET_AUTH,
    CLEAR_CART,
    SHOW_SUCCESS,
    SET_REORDER,
    CURRENT_RESTAURANT,
    SET_ERROR,
    OPEN_LOCATION,
    SET_CURRENT_PRICE
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
    loadMoreData: {
        skip: 0,
        limit: 6,
        size: 0
    },
    restaurants: [],
    restaurant: {},
    currentRestaurant: JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart'))['restaurant'] ? JSON.parse(localStorage.getItem('cart'))['restaurant'] : null,
    dish: {
        options: [],
        price: 0,
        totalPrice: 0
    },
    dishOptions: {},
    cart: JSON.parse(localStorage.getItem('cart')) || {
        items: [],
        totalPrice: 0,
        total: 0,
        totalItems: 0
    },
    showLogin: false,
    auth: JSON.parse(localStorage.getItem('auth')) || {
        token: null,
        user: null
    },
    reOrder: null,
    showSuccess: false,
    hasError: false,
    openLocation: false
};

const giveTotal = (arr) => {
    return arr.reduce((prev, next) => {
        return prev + next.totalPrice
    }, 0);
}

const updateCartItems = (cartItems, item, idx) => {

    if (item.count === 0) {
      return [
        ...cartItems.slice(0, idx),
        ...cartItems.slice(idx + 1)
      ];
    }
  
    if (idx === -1) {
      return [
        ...cartItems,
        item
      ];
    }

    const newArray = [...cartItems.slice(0, idx), item,...cartItems.slice(idx + 1)];
    const total = giveTotal(newArray);
  
    return [
        newArray,
        total
    ];
  };

const updateCartItem = (item, quantity) => {
    if(item.quantity <= 1 && quantity === -1) {
        item.quantity = 2;
    }
    quantity = item.quantity+quantity
    return {
        ...item,
        quantity,
        totalPrice: item.currentPrice * quantity
    }
}

const updateOrder = (state, id, quantity) => {
    const {cart: {items}} = state;
    const item = items.find(({uid}) => uid === id);
    const itemIndex = items.findIndex(({uid}) => uid === id);

    const newItem = updateCartItem(item, quantity);

    const [updatedItems, total] = updateCartItems(items, newItem, itemIndex);
    return {
        ...state,
        cart: {
            ...state.cart,
            items: updatedItems,
            total
        }
    };   
}

const deleteFood = (state, id) => {
    const {cart: {items}} = state;
    const itemIndex = items.findIndex(({uid}) => uid === id);
    const newArr = items;
    newArr.splice(itemIndex, 1);

    const total = giveTotal(newArr);

    return {
        ...state,
        cart: {
            ...state.cart,
            items: newArr,
            total,
            totalItems: newArr.length
        }
    }
};

const locationReducer = (state = initalState, action) => {
    switch(action.type) {
        case SET_LOCATION: return {
            ...state,
            location: action.payload
        }
        case OPEN_LOCATION: return {
            ...state,
            openLocation: action.payload
        }
        case SET_ERROR: return {
            ...state,
            hasError: action.payload
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
        case SET_LOAD_MORE_DATA: return {
            ...state, 
            loadMoreData: {
                ...state.loadMoreData,
                ...action.payload
            }
        }
        case SET_RESTAURANTS: return {
            ...state,
            restaurants: action.payload
        }
        case LOAD_MORE_RESTAURANTS: return {
            ...state,
            restaurants: [
                ...state.restaurants,
                ...action.payload
            ]
        }
        case SET_RESTAURANT: return {
            ...state,
            restaurant: action.payload,
            loadMoreData: {
                skip: 0,
                limit: 6,
                size: 0
            }
        }
        case SET_DISH: return {
            ...state,
            dish: {
                ...action.payload,
                totalPrice: action.payload.price
            },
            dishOptions: {}
        }
        case SET_TOTAL_PRICE: return {
            ...state, 
            dish: {
                ...state.dish,
                totalPrice: action.payload
            }
        }
        case SET_CURRENT_PRICE: return {
            ...state, 
            dish: {
                ...state.dish,
                currentPrice: action.payload
            }
        }
        case SET_DISH_OPTIONS: return {
            ...state,
            dishOptions: {
                ...state.dishOptions,
                ...action.payload
            }
        }
        case ADD_TO_CART: return {
            ...state,
            cart: {
                items: [...state.cart.items, action.payload],
                totalItems: state.cart.totalItems + 1,
                total:  giveTotal([...state.cart.items, action.payload])
            }
        }
        case CLEAR_CART: return {
            ...state,
            cart: {
                items: [],
                totalPrice: 0,
                total: 0,
                totalItems: 0
            },
            currentRestaurant: null
        }
        case CURRENT_RESTAURANT: return {
            ...state,
            currentRestaurant: action.payload
        }
        case INC_QUANTITY: return updateOrder(state, action.payload, 1)
        case DEC_QUANTITY: return updateOrder(state, action.payload, -1)
        case DELETE_FOOD: return deleteFood(state, action.payload)
        case SHOW_LOGIN: return {
            ...state,
            showModal: action.payload
        }
        case SET_AUTH: return {
            ...state,
            auth: action.payload
        }
        case SET_REORDER: return {
            ...state,
            reOrder: action.payload
        }
        case SHOW_SUCCESS: return {
            ...state,
            showSuccess: true
        }
        default: return state;
    }
};

export {
    locationReducer
}