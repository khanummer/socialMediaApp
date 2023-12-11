const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/users');



// new get route
router.get('/new', (req, res) => {
    res.render('./users/new')
});

// new post route
// add express session. async await
router.post('/new', (req, res) => {
    
    // setting the request form info to variables
    const username = req.body.username;
    const password = req.body.password;
    const bio = req.body.bio;

    // entering into the database
    const newUser = {};
    newUser.username = username;
    newUser.password = password;
    newUser.bio = bio;

    // console.log('THIS IS NEW USER ' + newUser);
    console.log(newUser)
    res.redirect('/');
});


router.get('/index', async (req, res) => {
   
   const allUsers = await User.find({})
   
   
    res.render('./users/index', {
        users: allUsers
    });
});


module.exports = router;