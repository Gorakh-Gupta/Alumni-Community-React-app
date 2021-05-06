const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const alumniSchema=new Schema({
	name:String,
	mail:{
		type:String,
		required:true
	},
	mob:{
		type:Number,
		min:1000000000,
		max:9999999999
	},
	pass:String
})
module.exports=new mongoose.model('Alumni',alumniSchema);