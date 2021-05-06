const jwt=require('jsonwebtoken');
function authUser(req,res,next)
{
	const token=req.cookies.token
	if(!token)
		return res.status(401).json({msg:"Unauthorized"});
	const authorized=jwt.verify(token,process.env.JWT_SECRET)
	req.user=authorized.id;
	next();
}
module.exports=authUser;