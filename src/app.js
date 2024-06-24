require('dotenv').config();
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser')



const database = require('./utils/database-util');
const router = require('./routes');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(morgan('dev'));
app.use(cors({
    origin: true,
    credentials: true,  
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}));
app.use(cookieParser());

// app routes
app.use('/api', router)


database(process.env.MONGO_URI);
app.listen(process.env.PORT, () => console.log(`> Server started on port: ${process.env.PORT}`));