const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type:mongoose.Schema.ObjectId, ref: "User"},
    image: String,
    description: String,
    comments: [ {userId: String, username: String, comment: String} ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;