import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';
const DOLAR_API_URL = 'https://pydolarve.org/api/v1/dollar?page=bcv';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getDolarRate = async () => {
  try {
    const response = await axios.get(DOLAR_API_URL);
    return response.data.monitors.usd.price;
  } catch (error) {
    console.error('Error fetching dólar rate:', error);
    return 0; // O lanzar el error para que el componente lo maneje
  }
};