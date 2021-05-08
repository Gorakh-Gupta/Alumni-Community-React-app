const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const User=require('../models/user');
const Notable=require('../models/notable')
const bcrypt = require('bcrypt');
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({ storage })
const jwt=require('jsonwebtoken');
const crypto=require('crypto')
const sgMail = require('@sendgrid/mail')
const authUser=require('../middleware/authUser');
sgMail.setApiKey(process.env.MAILAPI)

router.post('/login',async (req,res)=>{
	const {rollno,password}=req.body;
	const userfound=await User.findOne({roll:parseInt(rollno)});
	var authuser=null;
	if(userfound)
		authuser=await bcrypt.compare(password,userfound.pass);
	if(authuser)
	{
		const token=jwt.sign({id:userfound.roll},process.env.JWT_SECRET);
		res.cookie("token",token,{
			httpOnly:true,
		}).send();
	}
	else
	{
		res.json({msg:'NO valid username and password'});
	}
})
router.get('/logout',(req,res)=>{
	res.cookie("token","",{httpOnly:true,expires:new Date(0)}).send();
})
router.get('/loggedIn',(req,res)=>{
	const token=req.cookies.token;
	if(!token)
		return res.status(401).json({msg:"Unauthorized"});
	const authorized=jwt.verify(token,process.env.JWT_SECRET)
	if(!authorized)
	{
		return res.status(401).json({msg:"Unauthorized"});
	}
	res.send(true);
})
router.post('/resetpass',async (req,res)=>{
	const {pass,token}=req.body;
	await User.findOne({token:token,expire:{$gt:Date.now()}})
	.then((user)=>{
		if(!user)
		{
			res.json({msg:"Link Expired"})
		}
		else
		{
			bcrypt.hash(pass, 12, async function(err, hash) {
				user.pass=hash;
				user.token=undefined;
				user.expire=undefined;
				await user.save();
				res.json({msg:"Password changed Successfully"})
			})
		}
	})
	.catch((err)=>console.log(err))
})
router.post('/reset',async (req,res)=>{
	const {mail}=req.body;
	await User.findOne({mail:mail})
	.then((user)=>{
		if(!user)
		{
			res.json({msg:"User doesn't exist!"})
			return;
		}
		crypto.randomBytes(32,async (err,buffer)=>{
			if(err)
			{
				console.log(err);
				return;
			}
			const token=buffer.toString("hex");
			user.token=token;
			user.expire=Date.now()+300000;
			await user.save();
			sgMail.send(
			{
				to:mail,
				from:{
					name:"Alumni-Tracking System",
					email:"abhishektheswaraj@hotmail.com"
					},
				subject:"Password Reset Link",
				html:`<p>Dear ${user.name}</p><h4>Click on this <a href="http://localhost:3000/reset/${token}">Link</a> to reset Your Password</h4>`
			})
			res.json({msg:"check your Mail"})
		})
	})
	.catch((err)=>{
		console.log(err);
	})
})
router.get('/notable',async (req,res)=>{
	await Notable.find({})
	.then((data)=>res.json(data))
	.catch((err)=>console.log(err))
})
router.post('/notable',async (req,res)=>{
	const newnotable=new Notable(req.body);
	await newnotable.save()
	.then(()=>{
		console.log("saved Successfully")
		res.send();
	})
	.catch((err)=>console.log(err))
})
router.get('/:id',authUser,async (req,res)=>{
	const {id}=req.params;
	await User.find({roll:parseInt(id)})
	.then((data)=>{
		// console.log(data);
		res.json(data);
	})
	.catch((err)=>console.log(err))
})
router.put('/:id/edit',authUser,async (req,res)=>{
	const id=req.user;
	const user=await User.findOneAndUpdate({roll:parseInt(id)},req.body,{runValidators:true,new:true})
	.then(()=>res.json({code:0}))
	.catch((err)=>{
		res.json({code:1});
		console.log(err)
	})
})
router.post('/:id/profileUpdate',authUser,upload.single('file'),async (req,res)=>{
	const id=req.user;
	const newphoto={url:req.file.path,
					filename:req.file.filename}
	const user=await User.updateOne({roll:parseInt(id)},{photo:newphoto},{runValidators:true,new:true})
	.then((data)=>console.log(data))
	.catch((err)=>console.log(err))
	res.send();
})
router.put('/changepassword/:id',authUser,async (req,res)=>{
	const id=req.user;
	const {old,new1}=req.body;
	const userfound=await User.findOne({roll:parseInt(id)});
	var authuser=null;
	if(userfound)
		authuser=await bcrypt.compare(old,userfound.pass);
	if(authuser)
	{
		bcrypt.hash(new1, 12, async function(err, hash) {
			await User.updateOne({roll:parseInt(id)},{pass:hash})
			.then((data)=>res.json({msg:"Updated Password Successfully"}))
			.catch((err)=>console.log(err))
		})
	}
	else
	{
		res.json({msg:"Current Password is Wrong"})
	}
	
})
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
		sgMail.send({
			to:mail,
			from:{
				name:"Alumni Tracking System",
				email:"abhishektheswaraj@hotmail.com"
			},
			subject:"Signed up Successfully",
			html:`<h4>Welcome to Alumni Tracking System of NIT Patna</h4>
					<ul>
					<li> allows the Alumni members to register themselves</li>
					<li> allows colleges to verify and authenticate their registered alumni</li>
					<li> provision for alumni members to update their details</li>
					<li> allows the college to search details based on criteria such as year, department, etc.</li>
					<li> send messages and emails to alumni members</li>
					<li> Fund raise and publish notices on the portal</li>
					<li> Security features with login for every user.</li></ul>`

		})
		console.log('Submitted')
		res.json({msg:'Signed Up Successfully'})
		})
		.catch(err=>{
			res.json({code:1});
			console.log(err);
		});
	});		
})
module.exports=router;