const express = require('express');
const mongoose = require('mongoose');
const app = express();


require('dotenv').config();

// mongoDB
const database_Url = process.env.DATABASE_URL;
mongoose.connect(database_Url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.use(express.json());

// port no
const portNo = process.env.PORT_NO;
app.listen(portNo, () => {
    console.log(`application running on port no ${portNo}`);
})




// !Trigger
const movieRatingRouter = require('./route/movierating.route');
const userRouter = require('./route/userMovieRating.route');
const loginRouter =require('./route/login.route');
// const validateJWt = require('./middleware/verifyJWT');

app.use(express.json());
app.use('/movierating', movieRatingRouter);

app.use('/user', userRouter);
app.use('/auth', loginRouter);