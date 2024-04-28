import { useState } from 'react';
import axios from 'axios';

function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (method, payload) => {
    setLoading(true);
    try {
      const response = await axios({
        method: method,
        url: endpoint,
        data: payload
      });
      setData(response.data);
      return response.data;  
    } catch (err) {
      setError(err);
      return null;  
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
}

export default useApi;
