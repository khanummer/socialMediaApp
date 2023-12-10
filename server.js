const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const PORT = 3000;
const userController = require('./controllers/users');

// require mongoose database
require('./db/db');

// Using 'public' folder
app.use(express.static(__dirname + "/public"));

// using bodyParser to parse the body and get access to req.body
app.use(bodyParser.urlencoded({extended: false}));


// setting default view engine and extension 
app.set('views', './views');
app.set('view engine', 'ejs');

// Using user router 
app.use('/users', userController);


// Get Home Page
app.get('/', (req, res) => {
    res.render('index');
});



app.listen(PORT, () => {
    console.log('listening on port 3000')
});




// To start server
// npx nodemon server.js
// npm run dev