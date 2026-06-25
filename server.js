const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const app = express();

app.use(cors());

app.get('/download', async (req, res) => {
    let { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });

    // Link ko clean karna (sirf https://www.instagram.com/reel/ID/ rakhna)
    const cleanUrl = url.split('?')[0];

    try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`;
        const response = await axios.get(proxyUrl);
        
        const html = response.data.contents;
        const $ = cheerio.load(html);
        
        const videoUrl = $('meta[property="og:video"]').attr('content');
        
        if (!videoUrl) {
            return res.status(404).json({ error: "Video not found" });
        }

        res.json({ video: videoUrl });
    } catch (err) {
        res.status(500).json({ error: "Fetch failed" });
    }
});
