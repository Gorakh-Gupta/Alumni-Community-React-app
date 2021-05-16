const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const Post=require('../models/post');
const User=require('../models/user');
const auth=require('../middleware/authUser');
router.get('/allposts',async (req,res)=>{
	await Post.find({})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e));
})
router.get('/post/:id',async (req,res)=>{
	const {id}=req.params;
	await Post.find({_id:id})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e))
})
router.post('/addpost',auth,async (req,res)=>{
	const {content,name}=req.body;
	const utcdate=Date.now();
	const roll=req.user;
	const newpost=new Post({
		content:content,
		user:{
			name:name,
			roll:roll
		},
		time:utcdate,
	})
	newpost.save()
	.then(async ()=>{
		const newuser=await User.findOne({roll:roll})
		newuser.posts.push(newpost);
		newuser.save()
		.catch((e)=>console.log(e))
	})
	.catch((e)=>console.log(e));
	await Post.find({})
	.then((data)=>res.json(data))
})
router.put('/addcomment/:id',auth,async (req,res)=>{
	const {id}=req.params;
	const {comment}=req.body;
	const post=await Post.findById(id);
	const roll=req.user;
	post.comments.push({roll:roll,comment:comment})
	post.save();
	await Post.find({})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e));
})
router.get('/like/:id',auth,async (req,res)=>{
	const {id}=req.params;
	const post=await Post.findById(id);
	const user=await User.findOne({roll:req.user})
	post.likes.push(user);
	post.save();
	await Post.find({})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e));
})
router.get('/unlike/:id',auth,async (req,res)=>{
	const {id}=req.params;
	const user=await User.findOne({roll:req.user})
	Post.findByIdAndUpdate(id,{$pull:{likes:user._id}})
	.catch(e=>consle.log(e));
	await Post.find({})
	.then((data)=>res.json(data))
	.catch((e)=>console.log(e));
})
router.delete('/delete/:id',auth,async (req,res)=>{
	const {id}=req.params;
	const roll=req.user;
	await Post.deleteOne({_id:id})
	.then(async ()=>{
		await User.findOneAndUpdate({roll:roll},{$pull:{posts:id}})
		.catch(e=>console.log(e))
	})
	.catch((e)=>console.log(e))
})
module.exports=router;