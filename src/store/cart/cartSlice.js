import { createSlice } from '@reduxjs/toolkit';

const cartInLocalStorage = localStorage.getItem('cart');

const initialState = cartInLocalStorage ? JSON.parse(cartInLocalStorage) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const exists = state.find(item => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeItemInCart(state, action) {
      const course = action.payload;
      state = state.filter(item => item.id !== course.id);
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    },
    cleanCart(state, action) {
      state = [];
      localStorage.setItem('cart', JSON.stringify(state));
      return state;
    },
  },
});

export const { addToCart, removeItemInCart, cleanCart } = cartSlice.actions;

export const checkInCart = (state, courseId) => {
  return state.cart?.find(item => item.id === courseId);
};

export default cartSlice.reducer;
