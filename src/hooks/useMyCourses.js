import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { STATUS } from '../store/constant';
import {
  fetchMyCourses,
  selectMyCourses,
} from '../store/myCourses/myCoursesSlice';
import { useAuth } from '../services/auth.service';

const useMyCourses = () => {
  const [profile] = useAuth();
  const data = useSelector(selectMyCourses);
  const status = useSelector(state => state.myCourses.status);
  const error = useSelector(state => state.myCourses.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchMyCourses(profile?.id));
    }
  }, [dispatch, profile, status]);
  return [data, status, error];
};

export default useMyCourses;
