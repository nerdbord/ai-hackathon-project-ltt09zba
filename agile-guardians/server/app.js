require('dotenv').config();
const cors = require("cors");

const routes = require('./routes');

const express = require('express');
const app = express();
app.use(cors());
app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
