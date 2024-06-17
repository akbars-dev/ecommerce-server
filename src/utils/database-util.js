const mongoose = require('mongoose');

const database = async (uri) => {
    try {
        await mongoose.connect(uri, {});
        console.log('> MongoDB connected successfully');
    } catch (error) {
        console.error('> Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = database;