const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const Alumni=require('../models/alumni');
const passport=require('passport');
router.post('/',async (req,res)=>{
	 console.log(req.body);
	const {name,roll,mob,year,branch,mail,pass}=req.body;
		const newstudent=new Alumni({
		name:name,
		username:roll,
		mob:mob,
		year:year,
		branch:branch,
		mail:mail
		});
		const newuser=await Alumni.register(newstudent,pass)
		.then(()=>{
		console.log('Submitted')
		res.json({msg:'Signed Up Successfully'})
		})
		.catch(err=>{
			res.json({code:1});
			console.log(err);
	});		
});
router.post('/login',passport.authenticate('local'),(req,res)=>{
	
})

 module.exports=router;