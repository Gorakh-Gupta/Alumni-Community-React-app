const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const notableSchema=new Schema({
	name:String,
	year:Number,
	branch:String,
	photo:{
		type:String,
	},
	bio:String,
	designation:String
})
module.exports=new mongoose.model('Notable',notableSchema);