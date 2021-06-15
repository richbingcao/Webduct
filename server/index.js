// import express framework
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


// Set PORT# to listen on
const PORT = 5000;

// create server
const app = express();

// serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

// app.get('/movies', (req, res) => {
//   res.send('woooo');
// });

// start server
app.listen(PORT, () => console.log('Express server started on', PORT));