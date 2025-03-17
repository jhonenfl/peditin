import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const getPosts = async () => {
    const response = await API.get('/post');
    return response.data
}

export default API;