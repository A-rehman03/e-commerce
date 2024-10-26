// src/redux/reducer.jsx
import { combineReducers } from 'redux';

// Initial states
const initialProductsState = {
  products: [],
};

const initialCartState = {
  cartItems: [],
};

// Products reducer
const productsReducer = (state = initialProductsState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

// Cart reducer
const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
