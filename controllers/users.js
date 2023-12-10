const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/users');


app.set('views', './views');
app.set('view engine', 'ejs');

router.get('/new', (req, res) => {
    res.render('./users/new.ejs')
});

module.exports = router;