// src/features/cartSlice.js
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'https://fakestoreapi.com/products';
const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

export const setCart = createAction('cart/setCart');
export const resetCart = createAction('cart/resetCart');

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const addToCartAPI = createAsyncThunk('cart/addToCartAPI', async (item) => {
  const response = await axios.post(URL, item);
  return response.data;
});

export const removeFromCartAPI = createAsyncThunk('cart/removeFromCartAPI', async (id) => {
  await axios.delete(`${URL}/${id}`);
  return id;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },
    removeFromCart(state, action) { // Add this line
      const itemIndex = state.items.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalQuantity -= item.quantity;
        state.totalPrice -= item.totalPrice;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity > 0) {
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity * item.price) - item.totalPrice;
        item.quantity = quantity;
        item.totalPrice = quantity * item.price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce((sum, item) => sum + item.quantity, 0);
        state.totalPrice = action.payload.reduce((sum, item) => sum + item.totalPrice, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
          existingItem.totalPrice += action.payload.price;
        } else {
          state.items.push({
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          });
        }
        state.totalQuantity += 1;
        state.totalPrice += action.payload.price;
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        const itemIndex = state.items.findIndex(item => item.id === action.payload);
        if (itemIndex !== -1) {
          const item = state.items[itemIndex];
          state.totalQuantity -= item.quantity;
          state.totalPrice -= item.totalPrice;
          state.items.splice(itemIndex, 1);
        }
      })
      .addCase(setCart, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(resetCart, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

// Export the action creators
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions; // Make sure to export removeFromCart
export default cartSlice.reducer;
