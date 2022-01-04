import { useEffect, useState } from 'react';
import API from '../utils/API';

const useRate = (courseId, userId) => {
    const [data, setData] = useState();

    useEffect(() => {
      async function fetchData() {
        try {
          const res = await API.get(
            `/course/${courseId}/user/${userId}`
          );
          setData(res.data);
        } catch (error) {
          alert(error);
        }
      }

      if (userId) {     
        fetchData();
      }
    }, [courseId,userId]);

    return data;
};

export default useRate