const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/user');
const cors=require('cors');
router.use(cors({ origin: true, credentials: true }));

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

router.get('/search',async (req,res)=>{
	await User.find({name:{$regex:req.query.q, $options:'i'}})
	.then((data)=>{
		res.json(data);
	})
	.catch((data)=>console.log(error))
})
router.delete('/delete/:id',async (req,res)=>{
	const {id}=req.params;
	await User.findOneAndDelete({roll:parseInt(id)})
	.then((data)=>res.send())
	.catch((err)=>console.log(err))
})
module.exports=router;