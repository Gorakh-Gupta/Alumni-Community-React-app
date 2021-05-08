const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/user');
const Admin=require('../models/Admin')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAILAPI)
router.get('/searchBy',async (req,res)=>{
	const year=req.query.year;
	const branch=req.query.branch;
	const name=req.query.name;
	if(year && branch)
	{
		await User.find({name:{$regex:name, $options:'i'},year:year,branch:branch})
		.then((data)=>res.json(data))
		.catch((err)=>console.log(err))
	}
	else if(year)
	{
		await User.find({name:{$regex:name, $options:'i'},year:year})
		.then((data)=>res.json(data))
		.catch((err)=>console.log(err))
	}
	else if(branch)
	{
		await User.find({name:{$regex:name, $options:'i'},branch:branch})
		.then((data)=>res.json(data))
		.catch((err)=>console.log(err))
	}
	else
	{
		await User.find({name:{$regex:name, $options:'i'}})
		.then((data)=>{
			res.json(data);
		})
		.catch((error)=>console.log(error))
	}
})

router.post('/login',async (req,res)=>{
	const {mob,password}=req.body;
	const userfound=await Admin.findOne({mob:parseInt(mob)});
	var authuser=null;
	if(userfound)
		authuser=await bcrypt.compare(password,userfound.pass);
	if(authuser)
	{
		const token=jwt.sign({
			id:userfound._id,
		},process.env.JWT_SECRET)
		console.log(token);
		res.cookie("token",token,{
			httpOnly:true
		}).send();
	}
	else
	{
		res.json({msg:'NO valid username and password'});
	}
})
router.get('/logout',async (req,res)=>{
	res.cookie("token","",{
		httpOnly:true,
		expires:new Date(0),
	}).send();
})
router.post('/sendmail',async (req,res)=>{
	const {mail,sub,content}=req.body;
	console.log(req.body);
	await sgMail.send(
			{
				to:mail,
				from:{
					name:"Alumni-Tracking System",
					email:"abhishektheswaraj@hotmail.com"
					},
				subject:sub,
				html:`<h2>${content}</h2>`
			})
			res.json({msg:"Mail Successfully Delievered"})

})
router.get('/search',auth,async (req,res)=>{
	await User.find({name:{$regex:req.query.q, $options:'i'}})
	.then((data)=>{
		res.json(data);
	})
	.catch((error)=>console.log(error))
})
router.delete('/delete/:id',async (req,res)=>{
	const {id}=req.params;
	await User.findOneAndDelete({roll:parseInt(id)})
	.then((data)=>res.send())
	.catch((err)=>console.log(err))
})
router.post('/',async (req,res)=>{
	const {name,mob,mail,pass}=req.body;
		bcrypt.hash(pass, 12, async (err, hash)=>{
		const newstudent=new Admin({
		name:name,
		mob:mob,
		mail:mail,
		pass:hash
		});
		await newstudent.save()
		.then(()=>res.json({msg:'Signed Up Successfully'}))
		.catch(err=>{
			res.json({code:1});
			console.log(err);
		})

	})
});
module.exports=router;