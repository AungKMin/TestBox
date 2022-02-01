import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const serverUrl = (process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000');

const API = axios.create({ baseURL: serverUrl });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) { 
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// posts 
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByUser = () => API.get(`posts/userPosts`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

// authentication
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);