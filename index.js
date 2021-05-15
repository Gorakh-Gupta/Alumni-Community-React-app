if(process.env.NODE_ENV!=="production")
{
	require('dotenv').config()	
}
const express=require('express');
const app=express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter=require('./routes/userRoute');
const adminRouter=require('./routes/adminRoute');
const postRouter=require('./routes/postRoute');
const session=require('express-session');
const cookieParser=require('cookie-parser');
mongoose.connect('mongodb://localhost:27017/alumnidata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log('Database connected');
})
.catch((err)=>{
	console.log(err);
})
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use('/users',userRouter);
app.use('/admin',adminRouter);
app.use('/',postRouter);
app.listen(8080,(req,res)=>{
	console.log('server is listening');
})