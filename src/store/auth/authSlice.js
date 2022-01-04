import { createSlice } from '@reduxjs/toolkit';
// import moduleName from '';

export const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
    },
    removeAuth: state => {
      state = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
