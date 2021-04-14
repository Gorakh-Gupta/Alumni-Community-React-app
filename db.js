const mongoose = require('mongoose');
const connectDB=async ()=>{
	mongoose.connect('mongodb://localhost/student', {useNewUrlParser: true, useUnifiedTopology: true}).
	then(()=>{
	console.log('mongodb connected')
	})
	.catch(err=>{
	console.log(err)
	})
}
module.exports=connectDB;