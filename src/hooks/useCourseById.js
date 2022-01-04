import { useEffect, useState } from 'react';
import qs from 'query-string';

import { authHeader, useAuth } from '../services/auth.service';
import { STATUS } from '../store/constant';
import API from '../utils/API';

const useCourseById = (category, courseId) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [user] = useAuth();

  useEffect(() => {
    async function fetchData(userID) {
      try {
        setStatus(STATUS.LOADING);
        const _authHeader = await authHeader();
        const res = await API.get(
          `/categories/${category}/courses/${courseId}?${qs.stringify({
            userID,
          })}`,
          { headers: _authHeader }
        );
        setData(res.data);
        setStatus(STATUS.SUCCEEDED);
      } catch (error) {
        const message = error?.response?.data?.message;
        setError(message);
        setStatus(STATUS.FAILED);
      }
    }

    if (status === STATUS.IDLE) {
      fetchData(user?.id);
    }
  }, [category, courseId, status, user?.id]);

  return [data, status, error];
};

export default useCourseById;
