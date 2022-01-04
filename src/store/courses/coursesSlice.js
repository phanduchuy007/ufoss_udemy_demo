import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import qs from 'query-string';

import API from '../../utils/API';
import { STATUS } from '../constant';

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async userID => {
    const { data } = await API.get('/categories');
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const query = qs.stringify({
          size: 15,
          userID,
        });
        const res = await API.get(
          `/categories/${data[i].name}/courses?${query}`
        );
        const courses = res.data?.data;
        if (courses.length > 0) {
          data[i].children = courses;
        }
      }
    }
    return data;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCourses.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [fetchCourses.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.data = action.payload;
    },
    [fetchCourses.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});

export default coursesSlice.reducer;

export const selectAllCourses = state => state.courses.data;
