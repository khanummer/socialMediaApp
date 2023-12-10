const mongoose = require('mongoose');

// const connectionString = "mongodb://127.0.0.1";
const connectionString = "mongodb://0.0.0.0/nothingsocial"


mongoose.connect(connectionString)

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to ', connectionString);
})

mongoose.connection.on('error', err => {
    console.log('mongoose error' , err);
})

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected from ', connectionString);
});