import Axios from 'axios';

export const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL;

const Token = async () => {
  try {
    const authData: any = localStorage.getItem('finance-management-app');
    const parsedData: any = JSON.parse(authData);
    return parsedData.token;
  } catch (err) {
    return null;
  }
};

export const axios = Axios.create({
  baseURL: baseurl,
});

axios.interceptors.request.use(async (config: any) => {
  config.headers = {
    authorization: `Berear ${await Token()}`,
  };
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      // localStorage.removeItem('finance-management-app');

      // if (error?.response?.data?.message !== 'Invalid credentials!') {
      //   window.location.replace('/login');
      // }
    }
    throw error;
  },
);
