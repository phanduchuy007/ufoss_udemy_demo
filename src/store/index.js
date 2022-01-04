import { configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories/categoriesSlice';
import coursesReducer from './courses/coursesSlice';
import cartReducer from './cart/cartSlice';
import myCoursesSlice from './myCourses/myCoursesSlice';

export default configureStore({
  reducer: {
    courses: coursesReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    myCourses: myCoursesSlice,
  },
});
