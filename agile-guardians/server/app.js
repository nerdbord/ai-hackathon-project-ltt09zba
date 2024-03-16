const express = require('express');
const app = express();

const axios = require('axios');
const qs = require('qs'); // Axios używa tego pakietu do serializacji danych

const CLIENT_ID = '99db57c9bf2c4f3f80e4194a23cdb14a';
const CLIENT_SECRET = 'PL2Nsdi3StLXXoWquzW3evPYOKZ8rK9G3mvZaeQR6d2nBjhC9bxRMH0x9MnqJSa8';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_CODE = 'AUTHORIZATION_CODE_FROM_ALLEGRO'; // To jest kod, który otrzymasz po przekierowaniu

let globalAccessToken = null;
let globalAccessToken2 = null;

const productID = '58bc5a0a-ae03-4f24-91a8-fcb63ea571b7'; // Example product ID


async function getAccessToken(authCode) { // Teraz funkcja przyjmuje authCode jako argument
    const url = 'https://allegro.pl/auth/oauth/token';
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        code: authCode, // Użyj przekazanego kodu autoryzacyjnego
        redirect_uri: REDIRECT_URI
      }),
      url,
    };
  
    try {
      const response = await axios(options);
      console.log('Access Token:', response.data.access_token);
      return response.data.access_token; // Zwróć token dostępu
    } catch (error) {
      console.error('Error obtaining access token:', error);
      return null; // Zwróć null, jeśli nie udało się uzyskać tokena
    }
  }

// Twoje dotychczasowe importy i funkcje

app.get('/auth', (req, res) => {
    // Przekieruj do strony logowania Allegro
    const allegroAuthUrl = `https://allegro.pl/auth/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(allegroAuthUrl);
  });
  
  app.get('/callback', async (req, res) => {
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
  

      console.log('Access Token:', response.data.access_token);
      accessToken = response.data.access_token;
      globalAccessToken = accessToken;
      res.send('Autoryzacja zakończona sukcesem. Sprawdź konsolę serwera.');
    } catch (error) {
      console.error('Error obtaining access token:', error);
      res.status(500).send('Błąd podczas uzyskiwania tokena dostępu');
    }
  });

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Dodaj nowy endpoint
app.get('/fetch-allegro-data', async (req, res) => {
    try {
        const data = await fetchDataWithAccessToken(); // Użyj aktualnego tokena dostępu
        res.json(data); // Wyślij odpowiedź w formacie JSON
    } catch (error) {
        console.error('Error calling Allegro API:', error);
        res.status(500).send('Wystąpił błąd podczas próby pobrania danych z Allegro.');
    }
  });

  async function fetchDataWithAccessToken() {
    console.log("TOEKN" + globalAccessToken);
    if (!globalAccessToken) {
      console.log('Token dostępu jest wymagany.');
      return null; // Zwróć null, jeśli token dostępu nie został podany
    }
  
    try {
      const url = 'https://api.allegro.pl/sale/categories/2';
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${globalAccessToken}`,
          'Accept': 'application/vnd.allegro.public.v1+json',
          'Content-Type': 'application/vnd.allegro.public.v1+json'
        }
      });
  
      return response.data; // Zwróć dane odpowiedzi
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych z Allegro:', error);
      throw error; // Rzucić wyjątek, aby obsłużyć go na wyższym poziomie (w middleware)
    }
  }  


app.get('/search-allegro', async (req, res) => {
  // Read the query parameter for search
  const query = req.query.keyword;

  if (!query) {
      return res.status(400).send('Keyword query parameter is required');
  }

  try {
      // Ensure you have the access token
      if (!globalAccessToken) {
          return res.status(401).send('Unauthorized - No Access Token');
      }
//
      const url = 'https://api.allegro.pl/offers/listing';
      
      // Make a GET request to the Allegro API search endpoint
      const response = await axios.get(url, {
          headers: {
              'Authorization': `Bearer ${globalAccessToken}`,
              'Accept': 'application/vnd.allegro.public.v1+json'
          },
          params: {
              phrase: query, // The search keyword/phrase
              limit: 5      // Limit the results to 5
          }
      });

      // Extract the items from the response - adapt this according to the actual response structure
      const items = response.data.items.promoted.slice(0, 5).concat(response.data.items.regular.slice(0, 5));

      // Send back the first 5 products
      res.json(items);
  } catch (error) {
      console.error('Error searching Allegro API:', error.response ? error.response.data : error.message);
      res.status(500).send('Internal Server Error');
  }
});  

app.get('/allegro-categories', async (req, res) => {
  try {
    // Upewnij się, że token dostępu jest dostępny
    if (!globalAccessToken) {
      return res.status(401).send('Unauthorized - No Access Token');
    }

    //globalAccessToken = globalAccessToken + 's';
    //console.log('wrrong toekn' + globalAccessToken);

    // Definicja URL dla żądania GET
    const url = 'https://api.allegro.pl/sale/categories';
    
    // Wykonanie zapytania GET do Allegro
    const categoriesResponse = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${globalAccessToken}`,
        'Accept': 'application/vnd.allegro.public.v1+json',
      }
    });

    // Odpowiedź z listą kategorii
    res.json(categoriesResponse.data);
  } catch (error) {
    console.error('Error calling Allegro API for categories:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/active-offers', async (req, res) => {
  try {
    if (!globalAccessToken) {
      return res.status(401).send('Unauthorized - No Access Token');
    }

    const url = 'https://api.allegro.pl/sale/offers';

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${globalAccessToken}`,
        'Accept': 'application/vnd.allegro.public.v1+json',
      },
      params: {
        'publication.status': 'ACTIVE', // Filtering offers by publication status
        limit: 5  // You can set the limit of offers to be retrieved
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching active offers from Allegro API:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/search-products', async (req, res) => {
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
        phrase: phrase
        // Add other parameters if necessary
      }
    });

    // Check if the response has products
    if (response.data && response.data.products) {
      const simplifiedProducts = response.data.products.map(product => {
        // Assuming 'description' is provided as a simple string. Adjust this path based on the actual structure.
        let description = '';
        if (product.description && product.description.sections) {
          // Concatenate all text content from the description sections
          description = product.description.sections.map(section => 
            section.items.map(item => 
              item.type === 'TEXT' ? item.content : ''
            ).join('')
          ).join('');
        }

        return {
          name: product.name,
          description: description
        };
      });

      // Send back the simplified product information
      res.json(simplifiedProducts);
    } else {
      res.status(404).send('No products found or the structure of the response has changed.');
    }
  } catch (error) {
    console.error('Error searching products on Allegro:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/search-products_whole', async (req, res) => {
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
        phrase: phrase
        // Add other parameters if necessary
      }
    });

    // Check if the response has products
    if (response.data && response.data.products) {

      const simplifiedProducts = response.data.products;

      /*
      const simplifiedProducts = response.data.products.map(product => {
        // Assuming 'description' is provided as a simple string. Adjust this path based on the actual structure.
        let description = '';
        if (product.description && product.description.sections) {
          // Concatenate all text content from the description sections
          description = product.description.sections.map(section => 
            section.items.map(item => 
              item.type === 'TEXT' ? item.content : ''
            ).join('')
          ).join('');
        }

        return {
          name: product.name,
          description: description
        };
      });
      */

      // Send back the simplified product information
      res.json(simplifiedProducts);
    } else {
      res.status(404).send('No products found or the structure of the response has changed.');
    }
  } catch (error) {
    console.error('Error searching products on Allegro:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/product-details', async (req, res) => {
  const { productId } = req.query;

  if (!productId) {
      return res.status(400).send('Query parameter "productId" is required.');
  }

  try {
      const productDetails = await fetchProductDetailsById(productId);

      // Example of constructing a simplified response
      // You would need to adjust according to the actual structure of the Allegro response
      /*
      const simplifiedDetails = {
          name: productDetails.name,
          price: productDetails.price, // Adjust based on actual structure
          link: `https://allegro.pl/oferta/${productId}` // Constructing a hypothetical link
      };
      */

      res.json(productDetails);
  } catch (error) {
      res.status(500).send('Internal Server Error');
  }
});


async function fetchProductDetailsById(productId) {
  try {
      const response = await axios.get(`https://api.allegro.pl/sale/products/${productId}`, {
          headers: {
              'Authorization': `Bearer ${globalAccessToken}`,
              'Accept': 'application/vnd.allegro.public.v1+json'
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching product details:', error);
      throw error; // Re-throw the error to be handled by the caller
  }
}
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
