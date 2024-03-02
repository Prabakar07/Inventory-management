const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const HTTP_SERVER = express();
const config = require("./database/Dbconfig");
const PORT = process.env.PORT || 3000;

// Middleware
HTTP_SERVER.use(cors());
HTTP_SERVER.use(express.json());
HTTP_SERVER.use(bodyParser.json())
HTTP_SERVER.use(express.urlencoded({ extended: false }));

// Routes
HTTP_SERVER.use('/', require('./app'));

// Root route
HTTP_SERVER.get('/', (req, res) => {
  res.send('Server is running! Visit http://localhost:' + PORT);
});

// Start the server
HTTP_SERVER.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
