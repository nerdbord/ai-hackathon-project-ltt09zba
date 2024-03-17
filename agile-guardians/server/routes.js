const express = require('express');
const router = express.Router();
const axios = require('axios');
const he = require('he');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

let globalAccessToken = null;

router.get('/', (req, res) => {
    if (globalAccessToken) {
        res.send('You are already authenticated. Welcome to the application!');
    } else {
        // Redirect to Allegro authorization URL to start the authentication process
        const allegroAuthUrl = `https://allegro.pl/auth/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
        res.redirect(allegroAuthUrl);
    }
});

router.get('/callback', async (req, res) => {
    const { code } = req.query; // Przechwyć kod autoryzacyjny

    if (!code) {
        return res.status(400).send('Brak kodu autoryzacyjnego');
    }

    try {
        // Użyj kodu autoryzacyjnego do uzyskania tokena dostępu
        const response = await axios({
            method: 'post',
            url: 'https://allegro.pl/auth/oauth/token',
            data: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        accessToken = response.data.access_token;
        globalAccessToken = accessToken;
        res.send('Autoryzacja zakończona sukcesem. Sprawdź konsolę serwera.');
    } catch (error) {
        console.error('Error obtaining access token:', error);
        res.status(500).send('Błąd podczas uzyskiwania tokena dostępu');
    }
});

router.get('/search-products', async (req, res) => {
    const { phrase } = req.query;
  
    if (!phrase) {
      return res.status(400).send('Query parameter "phrase" is required.');
    }
  
    try {
      if (!globalAccessToken) {
        return res.status(401).send('Unauthorized - No Access Token');
      }
  
      const url = 'https://api.allegro.pl/sale/products';
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${globalAccessToken}`,
          'Accept': 'application/vnd.allegro.public.v1+json'
        },
        params: {
          phrase: phrase,
          language: 'pl-PL'
        }
      });
  
      if (response.data && response.data.products) {
        const limitedProducts = response.data.products.slice(0, 5);
        const simplifiedProducts = limitedProducts.map(product => {
          let description = '';
          if (product.description && product.description.sections) {
            description = product.description.sections.map(section => 
              section.items.map(item => 
                item.type === 'TEXT' ? item.content : ''
              ).join('')
            ).join('');
          }

            description = he.decode(description);
            description = description.replace(/<[^>]*>/g, '');
  
            const imageUrls = product.images.map(image => image.url);

            return {
              name: product.name,
              description: description,
              images: imageUrls
            };
        });
  
        res.json(simplifiedProducts);
      } else {
        res.status(404).send('No products found or the structure of the response has changed.');
      }
    } catch (error) {
      console.error('Error searching products on Allegro:', error.response ? error.response.data : error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;