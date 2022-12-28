const mongoose = require('mongoose');

const initMongoConnection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Connected to MongoDB successfully');
};

module.exports = {
    initMongoConnection
};