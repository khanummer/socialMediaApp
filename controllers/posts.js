const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const User = require('../models/users');

// get posts index
router.get('/index', async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.render('posts/index', {
            posts: allPosts,
        })
    } catch (err) {
        res.send(err);
        console.log(err);
    }  
});

// new post post route
router.post('/new', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id);
        const createPost = await Post.create(req.body);
        createPost.userId = foundUser._id;
        createPost.save();
        foundUser.posts.push(createPost._id);
        foundUser.save();
        res.redirect('/posts/index');
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

router.get('/new', async (req, res) => {
    const foundUser = await User.findById(req.session.user._id);
    res.render('posts/new', {
        user: foundUser
    })
});

module.exports = router;