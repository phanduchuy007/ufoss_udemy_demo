import { useEffect, useState } from 'react';
import { STATUS } from '../store/constant';
import API from '../utils/API';

const useSearchCourses = searchTerm => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(STATUS.IDLE);

  useEffect(() => {
    async function fetchData() {
      try {
        setStatus(STATUS.LOADING);
        const res = await API.get(`/courses?search=${searchTerm}`);
        setData(res.data);
        setStatus(STATUS.SUCCEEDED);
      } catch (error) {
        setError(error.response?.data?.message);
        setStatus(STATUS.FAILED);
      }
    }

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  return [data, status, error];
};

export default useSearchCourses;
