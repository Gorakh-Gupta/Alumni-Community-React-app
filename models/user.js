const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new Schema({
	name:{
		type: String,
		required:true
	},
	roll:{
		type:Number,
		required:true,
		max:9999999,
		unique:true
	},
	year:{
		type:Number,
		required:true,
		max:4000,
	},
	branch:{
		type:String,
		required:true,
		enum:['CSE','EE','ECE','CE','ME'],
	},
	mob:{
		type:Number,
		min:1000000000,
		max:9999999999
	},
	mail:{
		type:String
	}, 
	pass:{
		type:String,
		required:true
	},
	photo:String
});
const User=new mongoose.model('User',userSchema);
module.exports=User;
