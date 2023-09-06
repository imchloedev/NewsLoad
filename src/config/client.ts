import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const axiosConfig = {
  baseURL: BASE_URL,
};

export const client = axios.create(axiosConfig);
