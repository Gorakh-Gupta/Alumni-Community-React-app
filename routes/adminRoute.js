const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/user');
const Faq=require('../models/Faq');
const Admin=require('../models/Admin')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const auth=require('../middleware/authAdmin');
const sgMail = require('@sendgrid/mail')
const authToken=process.env.AUTH_TOKEN;
const accountSid=process.env.ACCOUNT_SID;
const client = require('twilio')(accountSid, authToken);
sgMail.setApiKey(process.env.MAILAPI)
router.get('/loggedIn',(req,res)=>{
	const token=req.cookies.token;
	if(!token)
		return res.json({msg:"Unauthorized"});
	const authorized=jwt.verify(token,process.env.JWT_SECRET)
	if(!authorized)
	{
		return res.json({msg:"Unauthorized"});
	}
	if(!authorized.adminid)
		return res.json({msg:"Unauthorized"});
	res.send(true);
})
router.get('/noanswerfaq',auth,async (req,res)=>{
	await Faq.find({answer:{$exists:false}})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e))
})
router.post('/faq/:id',async (req,res)=>{
	const {answer}=req.body;
	const {id}=req.params;
	const post=await Faq.findOneAndUpdate({_id:id},{answer:answer},{new:true})
	.then((res.json({})))
	.catch((e)=>console.log(e))
})
router.delete('/deletefaq/:id',async (req,res)=>{
	const {id}=req.params;
	await Faq.findOneAndDelete({_id:id})
	.then(()=>res.json({}))
	.catch((e)=>console.log(e))
})
router.get('/searchBy',auth,async (req,res)=>{
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
			adminid:userfound._id,
		},process.env.JWT_SECRET)
		res.cookie("token",token,{
			httpOnly:true
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
router.post('/loginOTP',async (req,res)=>{
	const {mob}=req.body;
	client.messages
  	.create({
     body: 'Trial Text Message',
     from: '+19105419861',
     to: `+91${mob}`
	  })
	  .then(message => console.log(message.sid))
	  .catch((err)=>console.log(err));

})
router.get('/logout',async (req,res)=>{
	res.cookie("token","",{
		httpOnly:true,
		expires:new Date(0),
	}).send();
})
router.post('/sendmail',auth,async (req,res)=>{
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
router.get('/search',async (req,res)=>{
	await User.find({name:{$regex:req.query.q, $options:'i'}})
	.then((data)=>{
		res.json(data);
	})
	.catch((error)=>console.log(error))
})
router.delete('/delete/:id',auth,async (req,res)=>{
	const {id}=req.params;
	await User.findOneAndDelete({roll:parseInt(id)})
	.then((data)=>{
		
		res.send()
	})
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