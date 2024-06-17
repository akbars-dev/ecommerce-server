require('dotenv').config();
const express = require('express');

const path = require('path');

const database = require('./utils/database-util');
const router = require('./routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

// app routes
app.use('/api', router)


database(process.env.MONGO_URI);
app.listen(process.env.PORT, () => console.log(`> Server started on port: ${process.env.PORT}`));