import axios from 'axios';
const BASE_URL = 'https://ws.yektoman.ir/api/v1';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});