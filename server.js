const express = require('express');
const app = express();
const PORT = 3000;

// Using 'public' folder
app.use(express.static(__dirname + "/public"));

// Get Home Page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
    console.log('listening on port 3000')
});
