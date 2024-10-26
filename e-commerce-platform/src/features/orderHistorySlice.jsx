// src/redux/orderHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState: {
    orders: [], // Will hold the list of past orders
  },
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrder } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
