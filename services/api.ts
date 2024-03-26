/* eslint-disable prettier/prettier */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'

export const baseURL = 'https://beco-back.onrender.com/';
export const localURL = 'http://localhost:3333/';
export const imageURL = 'https://beco-back.onrender.com/files/';


export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async config => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

