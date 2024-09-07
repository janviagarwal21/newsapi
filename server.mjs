import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/api/top-headlines', async (req, res) => {
    const countryCode = req.query.countryCode;
    const apiKey = '1cf22ddf5d164f22a704b63897d027ca'; 
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
