require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');



const database = require('./utils/database-util');
const router = require('./routes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,  
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));
app.use(cookieParser());

// app routes
app.use('/api', router)


database(process.env.MONGO_URI);
app.listen(process.env.PORT, () => console.log(`> Server started on port: ${process.env.PORT}`));