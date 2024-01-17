import { axios } from '../utils/axios';

export const amountDeposit = async (data: any) => {
  try {
    const response = await axios.post('/api/v1/finance/deposit', data);
    return response.data;
  } catch (error) {
    console.error('Finance amount error:', error);
    throw error;
  }
};
export const amountWithdraw = async (data: any) => {
  try {
    const response = await axios.post('/api/v1/finance/withdraw', data);
    return response.data;
  } catch (error) {
    console.error('Finance amount error:', error);
    throw error;
  }
};

export const getFinance = async (params: any) => {
  try {
    const response = await axios.get('/api/v1/finance/transactions', { params });
    return response.data;
  } catch (error) {
    console.error('Get finance error:', error);
    throw error;
  }
};

export const getTotal = async (params: any) => {
  try {
    const response = await axios.get('/api/v1/finance/getTotal', { params });
    return response.data;
  } catch (error) {
    console.error('Get total error:', error);
    throw error;
  }
};
