import axios from 'axios';

const API = axios.create({
    baseURL: 'https://youtubecalc-1.onrender.com/',
});

export const calculatePlaylist = (playlistUrl) => API.post('/api/playlist/calculate', { playlistUrl });
export const getHistory = () => API.get('/api/playlist/history');
