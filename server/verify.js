const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/playlist';
const PLAYLIST_URL = 'https://youtube.com/playlist?list=PLHSJmoEI2qfDvjlWEib2n9kRFfv0yIIGL';

async function verify() {
    try {
        console.log('--- Testing /calculate ---');
        const calcRes = await axios.post(`${BASE_URL}/calculate`, {
            playlistUrl: PLAYLIST_URL
        });
        console.log('Status:', calcRes.status);
        console.log('Title:', calcRes.data.playlistTitle);
        console.log('Total Duration:', calcRes.data.totalDuration);
        console.log('Video Count:', calcRes.data.videoCount);

        console.log('\n--- Testing /history ---');
        const historyRes = await axios.get(`${BASE_URL}/history`);
        console.log('Status:', historyRes.status);
        console.log('History Count:', historyRes.data.length);
        if (historyRes.data.length > 0) {
            console.log('First Record Title:', historyRes.data[0].playlistTitle);
        }

        console.log('\nVERIFICATION SUCCESSFUL');
    } catch (error) {
        console.error('VERIFICATION FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

verify();
