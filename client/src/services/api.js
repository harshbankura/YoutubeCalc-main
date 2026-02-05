import axios from 'axios';

const API = axios.create({
    baseURL: 'https://youtubecalc-1.onrender.com/',
});

export const calculatePlaylist = (playlistUrl) => API.post('/calculate', { playlistUrl });
export const getHistory = () => API.get('/history');
