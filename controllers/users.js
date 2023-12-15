const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');



// new get route
router.get('/new', (req, res) => {
    res.render('./users/new')
});

// user register account route
router.post('/register', async (req, res) => {
    
    // setting the request form info to variables
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const bio = req.body.bio;

    // entering into the database
    const newUser = {};
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.bio = bio;

    try {
        // creating user
        const createdUser = await User.create(newUser);
        // creating a session
        req.session.user = createdUser;
        req.session.logged = true;

        res.redirect('/');

    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

// user log in route
router.post('/login', async (req, res) => {
    try {
        const loggedUser = await User.findOne({username: req.body.username});

        if(bcrypt.compareSync(req.body.password, loggedUser.password)) {
            req.session.message = '';
            req.session.currentUser = loggedUser._id;
            req.session.logged = true;
            req.session.user = loggedUser;
            res.redirect('/');
        } else {
            req.session.message ='your username or password are incorrect'
            console.log('your username or password are incorrect');
            res.redirect('/');
        }
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

// user log out route
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})


// users index route
router.get('/index', async (req, res) => {
   
   const allUsers = await User.find({})
   
   
    res.render('./users/index', {
        users: allUsers
    });
});







module.exports = router;