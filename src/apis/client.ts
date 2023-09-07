import axios from 'axios';
import Config from 'react-native-config';

const axiosConfig = {
  baseURL: Config.BASE_URL,
};

export const instance = axios.create(axiosConfig);
