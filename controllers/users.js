const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');



// register & login get route
router.get('/new', async (req, res) => {
    if (req.session.logged == true) {
        try {
            const foundUser = await User.findOne({username: req.session.user.username});
            const loggedUser = await req.session.user.username

            res.render('./users/new', {
                loggedUser: loggedUser
            }) 
        } catch(err) {
            res.send(err);
            console.log(err);
        }
    } else {
            res.render('./users/new', {
                loggedUser: ''
            })
        } 
});

// register account route
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





// router get delete
router.get('/delete', async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.session.username})
        res.send('./users/delete', {
            user: foundUser
        })
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});





// user delete account route
router.delete('/delete', (req, res) => {
    User.findByIdAndRemove({username: req.session.user.username}, (err) => {
        if(err) {
            res.send(err);
        } else {
            req.session.destroy();
            res.redirect('/');
        }
    })
})


// users index route
router.get('/index', async (req, res) => {
    if (req.session.logged == true) {

        try {
            const allUsers = await User.find({})
            const foundUser = await User.findOne({username: req.session.user})
            const loggedUser = await req.session.user.username
            res.render('./users/index', {
                users: allUsers,
                loggedUser: loggedUser
            });
        } catch(err) {
            res.send(err);
            console.log(err);
        }
    } else {
        const allUsers = await User.find({})
        res.render('./users/index', {
            users: allUsers,
            loggedUser: ''

        });
    }
    });


// get users settings route
router.get('/settings', async (req, res) => {
    if (req.session.logged == true) {
        try {
            const foundUser = await User.findOne({username: req.session.user.username})
            const loggedUser = await req.session.user.username
            res.render('./users/settings', {
                loggedUser: loggedUser,
                user: foundUser
            });
        } catch(err) {
            res.send(err);
            console.log(err);
        }
    } else {
        const foundUser = await User.findOne({username: req.session.user.username})
        res.render('./users/settings', {
            loggedUser: '',
            user: foundUser
        })
    }
})

// get single user route
// add if user is logged in they have an edit button and can edit
// if (req.session.user._id == req.params.id) res.render showwithEditbutton.ejs
router.get('/:id', async (req, res) => {
    if (req.session.logged == true) {

        try {
            const foundUser = await User.findById(req.params.id);
            const loggedUser = await req.session.user.username;
            res.render('./users/show', {
                user: foundUser,
                loggedUser: loggedUser
            })
        } catch(err) {
            console.log(err);
            res.send(err);
        }
    } else {
        const foundUser = await User.findById(req.params.id);
        res.render('./users/show', {
            user: foundUser,
            loggedUser: ''
        })
    }
})

// user edit route
router.get('/:id/edit', async (req, res) => {
    const foundUser = await User.findById(req.params.id);
    const loggedUser = await req.session.user.username;
    res.render('./users/edit', {
        user: foundUser,
        loggedUser: loggedUser
    })

});




module.exports = router;