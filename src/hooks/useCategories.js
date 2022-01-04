import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  selectCategories,
} from '../store/categories/categoriesSlice';
import { STATUS } from '../store/constant';

const useCategories = () => {
  const data = useSelector(selectCategories);
  const status = useSelector(state => state.categories.status);
  const error = useSelector(state => state.categories.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  return [data, status, error];
};

export default useCategories;
