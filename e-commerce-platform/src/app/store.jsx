// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/ProductSlice';
import cartReducer from '../features/cartSlice';
import orderHistoryReducer from '../features/orderHistorySlice';
import rootReducer from '../features/reducers';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    reducer: rootReducer,
  },
});

export default store;
