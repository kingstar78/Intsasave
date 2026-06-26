// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download', async (req, res) => {
    try {
        const { url } = req.query;
        // Your Instagram download logic here
        const mediaUrl = await getInstagramMedia(url);
        res.json({
            url: mediaUrl,
            type: 'video',
            caption: 'Instagram post'
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000);
