
const mongoose = require('mongoose')
const { MONGODB_URI } = process.env;

//CONNECTION
mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI);

mongoose.connection
    .on('open', () => console.log('You are connected to mongoose'))
    .on('close', () => console.log('You are disconnected to mongoose'))
    .on('error', (error) => console.log('error'))
