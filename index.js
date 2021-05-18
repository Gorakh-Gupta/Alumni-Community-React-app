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
const path=require('path');
//mongodb://localhost:27017/alumnidata  "local mongo"
mongoose.connect('mongodb+srv://DbUser:DbUser@cluster0.apwot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
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
if(process.env.NODE_ENV=='production')
{
	app.use(express.static('client/build'));
	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
}
const port=process.env.PORT || 8080;
app.listen(port,(req,res)=>{
	console.log('server is listening on port'+port);
})