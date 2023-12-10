const express = require('express');
const app = express();
const session = require('express-session');
const PORT = 3000;

// require mongoose database
require('./db/db');

// Using 'public' folder
app.use(express.static(__dirname + "/public"));


// ?
app.set('views', './views');
app.set('view engine', 'ejs');


// Get Home Page
app.get('/', (req, res) => {
    res.render('index');
});

// Get Login Page
app.get('/signup', (req, res) => {
    res.render('/users/new')
});

app.listen(PORT, () => {
    console.log('listening on port 3000')
});




// To start server
// npx nodemon server.js
// npm run dev