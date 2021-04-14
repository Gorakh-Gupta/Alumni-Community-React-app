const express=require('express');
const app=express();
const mongoose = require('mongoose');
const userRouter=require('./routes/userRoute');
var cors = require('cors');
mongoose.connect('mongodb://localhost:27017/alumnidata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log('Database connected');
})
.catch((err)=>{
	console.log(err);
})
app.use(express.urlencoded({ extended: true }))
app.use('/users',userRouter);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.listen(8080,(req,res)=>{
	console.log('server is listening');
})