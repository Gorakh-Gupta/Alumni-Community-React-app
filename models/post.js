const mongoose=require('mongoose');
const Schema=mongoose.Schema;
// const User=require('./user');
const postSchema=new Schema({
	content:{
		type:String,
		required:true
	},
	user:{
		name:String,
		roll:Number
	},
	comments:[{
		roll:Number,
		comment:String
	}],
	likes:[{
		type:Schema.Types.ObjectId,
		ref:'User'
	}],
	time:{
		type:Date,
	}
})
module.exports=mongoose.model('Post',postSchema)