const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const faqSchema=new Schema({
	question:String,
	answer:String
})
module.exports=new mongoose.model('Faq',faqSchema);