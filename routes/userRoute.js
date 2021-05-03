const express=require('express');
const router=express.Router();
var cors = require('cors');
const mongoose = require('mongoose');
const User=require('../models/user');
const Notable=require('../models/notable')
const bcrypt = require('bcrypt');
const multer  = require('multer')
const {storage}=require('../cloudinary')
const upload = multer({ storage })
router.use(cors({ origin: true, credentials: true }));
router.use(express.urlencoded({ extended: true }))
router.use(express.json({ extended: false}));

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
module.exports=router;