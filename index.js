if(process.env.NODE_ENV!=="production")
{
	require('dotenv').config()	
}
const express=require('express');
const app=express();
const mongoose = require('mongoose');
const User=require('./models/alumni')
const userRouter=require('./routes/userRoute');
const alumniRoute=require('./routes/alumniRoute');
const session=require('express-session');
var cors = require('cors');
const passport=require('passport');
const LocalStrategy=require('passport-local');
mongoose.connect('mongodb://localhost:27017/alumnidata', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
	console.log('Database connected');
})
.catch((err)=>{
	console.log(err);
})
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/fakeuser',async(req,res)=>{
	const user=new User({email:"abhi@cs.com",username:1904012})
	const newUser=await User.register(user,"gandhi1234")
	console.log(newUser);
})
app.use('/',alumniRoute);
app.use('/users',userRouter);
app.listen(8080,(req,res)=>{
	console.log('server is listening');
})