const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');


// create new post route
router.post('/new', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const createPost = await Post.create(req.body);
        createPost.user = foundUser;
        createPost.save();
        foundUser.posts.push(createPost._id);
        foundUser.save();
        res.redirect('/posts/index');
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

// get new post route
router.get('/new', async (req, res) => {
    const foundUser = await User.findById(req.session.user._id);
    res.render('posts/new', {
        user: foundUser
    })
});

// get posts index
router.get('/index', async (req, res) => {
    try {
        const allPosts = await Post.find({}).populate("user");
        res.render('posts/index', {
            posts: allPosts,
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }  
});

// get single post route
// add if logged user = post userID show settings show page 
router.get('/:id', async (req, res) => {
    try {

        const foundPost = await Post.findById(req.params.id).populate("user")
        res.render('posts/show', {
            post: foundPost
        })
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;