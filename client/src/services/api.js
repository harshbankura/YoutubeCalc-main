import axios from 'axios';

const API = axios.create({
    baseURL: 'https://youtubecalc-main.onrender.com/',
});

export const calculatePlaylist = (playlistUrl) => API.post('/api/playlist/calculate', { playlistUrl });
export const getHistory = () => API.get('/api/playlist/history');
