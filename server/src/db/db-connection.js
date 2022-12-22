const mongoose = require('mongoose');

const initConnection = async () => {
    await mongoose.connect('mongodb://localhost:27017/');
    console.log('Connected to mongoDB successfully');
};

module.exports = {
    initConnection,
};