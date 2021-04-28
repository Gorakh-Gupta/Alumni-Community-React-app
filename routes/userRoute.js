const express=require('express');
const session=require('express-session')
const router=express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const User=require('../models/user');
const bcrypt = require('bcrypt');
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({ storage })
router.use(cors({ origin: true, credentials: true }));
router.use(express.urlencoded({ extended: true }))
router.use(express.json({ extended: false}));
router.use(
	session(
	{
		secret:process.env.SESSION_SECRET,
		saveUninitialized:true,
		resave:false,
		cookie:
		{
			httpOnly:true,
			maxAge:3600000
		}
	})
);
router.get('/',async (req,res)=>{
	const users=await User.find({})
	.then((user)=>{
		res.json(user);
	})
	.catch(err=>{
	console.log(err);
	})
	
})
router.post('/',async (req,res)=>{
	 console.log(req.body);
	const {name,roll,mob,year,branch,mail,pass}=req.body;
		bcrypt.hash(pass, 12, async function(err, hash) {
		const newstudent=new User({
		name:name,
		roll:roll,
		mob:mob,
		year:year,
		branch:branch,
		mail:mail,
		pass:hash
		});
		await newstudent.save()
		.then(()=>{
		console.log('Submitted')
		res.json({msg:'Signed Up Successfully'})
		})
		.catch(err=>{
			res.json({code:1});
			console.log(err);
		});
	});		
})
router.post('/login',async (req,res)=>{
	const {rollno,password}=req.body;
	const userfound=await User.findOne({roll:parseInt(rollno)});
	console.log(userfound);
	var authuser=null;
	if(userfound)
		authuser=await bcrypt.compare(password,userfound.pass);
	if(authuser)
	{
		res.json(userfound);
		req.session.roll=userfound.roll;
		console.log(req.session);
	}
	else
	{
		res.json({msg:'NO valid username and password'});
	}
})
router.get('/:id',async (req,res)=>{
	const {id}=req.params
	await User.find({roll:id})
	.then((data)=>{
		res.json(data);
	})
	.catch((err)=>console.log(err))
})
router.put('/:id/edit',async (req,res)=>{
	const {id}=req.params;
	const user=await User.findOneAndUpdate({roll:parseInt(id)},req.body,{runValidators:true,new:true})
	.then(()=>res.json({code:0}))
	.catch((err)=>{
		res.json({code:1});
		console.log(err)
	})
})
router.post('/:id/profileUpdate',upload.single('file'),async (req,res)=>{
	const {id}=req.params;
	const newphoto={url:req.file.path,
					filename:req.file.filename}
	const user=await User.updateOne({roll:parseInt(id)},{photo:newphoto},{runValidators:true,new:true})
	.then((data)=>console.log(data))
	.catch((err)=>console.log(err))
	res.send();
})
module.exports=router;