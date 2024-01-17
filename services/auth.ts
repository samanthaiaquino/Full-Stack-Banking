/* eslint-disable implicit-arrow-linebreak */

import { axios } from '../utils/axios';

export const Login = async (data: any) =>
  await axios.post('/api/v1/user/login', data).then((res: any) => res.data);

  export const RegisterBasic = async (data: any) =>
  await axios.post('/api/v1/user/signup', data).then((res: any) => res.data);

export const LoginWithGoogleAuth = async (data: any) =>
    await axios.post('/api/v1/user/loginWithGoogle', data).then((res: any) => res.data);
