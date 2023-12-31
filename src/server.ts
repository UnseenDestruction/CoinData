const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const marketCapAPI = process.env.MARKETCAP;

console.log(marketCapAPI)

app.use(cors());

app.get('/', async (req:any, res:any) => {
  try {
    const optionsLatest = {
      method: 'GET',
      url: 'https://pro-api.coinmarketcap.com/v1/community/trending/token',
      headers: {
        'X-CMC_PRO_API_KEY': marketCapAPI,
      },
    };

    const optionsNews = {
      method: 'GET',
      url: 'https://pro-api.coinmarketcap.com/v1/content/posts/top',
      headers: {
        'X-CMC_PRO_API_KEY': marketCapAPI,
      },
    };

    const responseLatest = await axios.get(optionsLatest);
    const responseNews = await axios.get(optionsNews);

    const latestData = responseLatest.data;
    const newsData = responseNews.data;

    const combinedData = {
      latestData,
      newsData,
    };

    res.json(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
    console.error('Error fetching latest data:', error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
