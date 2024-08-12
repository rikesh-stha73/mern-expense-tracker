const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRoute');
const app = express();

//!Connect to MongoDB
mongoose
.connect('mongodb://localhost:27017/mern-exp-tracker')
.then(()=>console.log('Connected to MongoDB...'))
.catch((err)=>console.log(err));

//!Cors config
const corsOption ={
    origin: ['http://localhost:5173'],
};
app.use(cors(corsOption));

//!Middlewares
app.use(express.json()); //?Pass incoming json data to req.body


//!Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);


//! Error
app.use(errorHandler);

//!Start the app
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} ...`);
});