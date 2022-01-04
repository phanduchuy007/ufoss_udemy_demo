import { useEffect, useState } from 'react';
import qs from 'query-string';

import { useAuth } from '../services/auth.service';
import { STATUS } from '../store/constant';
import API from '../utils/API';

const useCoursesByCategory = (category, query) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);
  const [user] = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        setStatus(STATUS.LOADING);
        let newQuery = qs.stringify({ ...query, userID: user?.id });
        const res = await API.get(
          `/categories/${category}/courses?${newQuery}`
        );
        setData(res.data);
        setStatus(STATUS.SUCCEEDED);
      } catch (error) {
        const message = error?.response?.data?.message;
        setError(message);
        setStatus(STATUS.FAILED);
      }
    }

    fetchData();
  }, [category, query, user]);

  return [data, status, error];
};

export default useCoursesByCategory;
