const express = require('express')
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const ConnectedtoDb = require('./config/db')
ConnectedtoDb();

const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const userRouter = require('./routes/user.routes');
const connectToDb = require('./config/db');

app.set('view engine', 'ejs');

app.use('/user', userRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})