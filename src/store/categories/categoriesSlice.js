import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '../../utils/API';
import { STATUS } from '../constant';

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const { data } = await API.get('/categories');
    return data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.data = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});

export default categoriesSlice.reducer;

export const selectCategories = state => state.categories.data;
