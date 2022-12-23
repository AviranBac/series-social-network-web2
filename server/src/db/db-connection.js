const mongoose = require('mongoose');

const initConnection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/');
    console.log('Connected to mongoDB successfully');
};

module.exports = {
    initConnection,
};