const mongoose = require('mongoose');
const connectDB=async ()=>{
	//mongodb://localhost/student
	mongoose.connect('mongodb+srv://DbUser:DbUser@cluster0.apwot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).
	then(()=>{
	console.log('mongodb connected')
	})
	.catch(err=>{
	console.log(err)
	})
}
module.exports=connectDB;