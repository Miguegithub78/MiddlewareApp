import axios from 'axios'
import dotenv from "dotenv";
dotenv.config();

const clienteAxios = axios.create({
    baseURL: 'http://localhost:3001'
});
//process.env.REACT_APP_API_URL ||
export default clienteAxios;