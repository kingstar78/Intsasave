const express = require('express');
const axios = require('axios');
const app = express();

app.get('/download', async (req, res) => {
    const { url } = req.query;
    try {
        const options = {
            method: 'GET',
            url: 'https://instagram-downloader-data.p.rapidapi.com/v1/video', // API ka URL
            params: { url: url },
            headers: {
                'X-RapidAPI-Key': 'YAHAN_APNI_API_KEY_PASTE_KAREIN',
                'X-RapidAPI-Host': 'instagram-downloader-data.p.rapidapi.com'
            }
        };
        const response = await axios.request(options);
        res.json(response.data);
    } catch (err) {
        res.status(500).send("API error: Check your subscription or URL");
    }
});

app.listen(process.env.PORT || 3000);
