const express=require('express');
const router=express.Router();
var cors = require('cors');
const mongoose = require('mongoose');
const User=require('../models/user');
const bcrypt = require('bcrypt');
router.use(cors({ origin: true, credentials: true }));
router.use(express.urlencoded({ extended: true }))
router.use(express.json({ extended: false}));
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
	const {name,roll,mob,year,branch,email,pass}=req.body;
		bcrypt.hash(pass, 12, async function(err, hash) {
		const newstudent=new User({
		name:name,
		roll:roll,
		mob:mob,
		year:year,
		branch:branch,
		email:email,
		pass:hash
		});
		await newstudent.save()
		.then(()=>{
		console.log('Submitted')
		res.json({msg:'Signed Up Successfully'})
		})
		.catch(err=>console.log(err));
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
		console.log(req.session.roll);
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
module.exports=router;