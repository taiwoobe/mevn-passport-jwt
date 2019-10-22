import axios from 'axios';

export const HTTP = axios.create({
  baseURL: `http://localhost:3000/api/`,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }
})