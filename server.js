const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = 3000;
const userController = require('./controllers/users');
const postController = require('./controllers/posts')
const Post = require('./models/posts');


// require mongoose database
require('./db/db');

// Using 'public' folder
app.use(express.static(__dirname + "/public"));

//using method override to add delete method
app.use(methodOverride('_method'));

// using bodyParser to parse the body and get access to req.body
app.use(bodyParser.urlencoded({extended: false}));

// using express session
app.use(session({
    secret: 'THIS IS A RANDOM SECRET STRING',
    resave: false,
    saveUninitialized: false
}))


// setting default view engine and extension 
app.set('views', './views');
app.set('view engine', 'ejs');

// Using routers
app.use('/users', userController);
app.use('/posts', postController);


// Get Home Page
app.get('/home', async (req, res) => {
    try {
        const loggedUser = await req.session.user;
        const allPosts = await Post.find({}).populate("user");
        res.render('home',{
            loggedUser: loggedUser,
            posts: allPosts
        });
        console.log(req.session);
        console.log(req.params)
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});


app.get('/', async (req, res) => {
    if (req.session.logged == true) {
        const loggedUser = await req.session.user
        const allPosts = await Post.find({}).populate("user");
        res.render('home',{
            loggedUser: loggedUser,
            posts: allPosts
        });
    } else {
        res.render('landing');
    }
})




app.listen(PORT, () => {
    console.log('listening on port 3000')
});




// To start server
// npx nodemon server.js
// npm run dev