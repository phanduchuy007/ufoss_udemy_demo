import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '../../utils/API';
import { STATUS } from '../constant';

const initialState = {
  data: [],
  status: STATUS.IDLE,
  error: null,
};

export const fetchMyCourses = createAsyncThunk(
  'myCourses/fetchMyCourses',
  async id => {
    const { data } = await API.get(`/mycourses/${id}`);
    return data;
  }
);

const myCourseSlice = createSlice({
  name: 'myCourses',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMyCourses.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [fetchMyCourses.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEEDED;
      state.data = action.payload;
    },
    [fetchMyCourses.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.error = action.error.message;
    },
  },
});

export default myCourseSlice.reducer;

export const selectMyCourses = state => state.myCourses.data;

export const isMyCourses = (state, courseId) => (
  state.myCourses.data.find(item => item.id === courseId))
