const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');
const UserSchema=new Schema({
	name:{
		type: String,
		required:true
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
	photo:{
		url:{
			type:String,
			default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
		},
		filename:{
			type:String,
			default:"no-img"
		}
	}
});
UserSchema.plugin(passportLocalMongoose);
const Alumni=mongoose.model('Alumni',UserSchema);
module.exports=Alumni;