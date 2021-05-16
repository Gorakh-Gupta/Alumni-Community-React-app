const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const Post=require('./post')
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
	photo:{
		url:{
			type:String,
			default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
		},
		filename:{
			type:String,
			default:"no-img"
		}
	},
	designation:String,
	organization:String,
	bio:String,
	token:String,
	expire:{
		type:Number,
	},
	posts:[
	{
		type:Schema.Types.ObjectId,
		ref:'Post'
	}]
});
const User=new mongoose.model('User',userSchema);
module.exports=User;
