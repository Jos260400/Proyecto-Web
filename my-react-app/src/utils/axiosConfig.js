import axios from 'axios';


const getAuthToken = () => localStorage.getItem('authToken');


const axiosInstance = axios.create({
  baseURL: 'https://proyecto-web-eq5k.vercel.app/', 
  headers: {
    'Content-Type': 'application/json'
  }
});


axiosInstance.interceptors.request.use(
  config => {

    if (!config.url.endsWith('/login')) {
      const token = getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
  
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  response => {

    return response;
  },
  error => {

    if (error.response && error.response.status === 401) {

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;