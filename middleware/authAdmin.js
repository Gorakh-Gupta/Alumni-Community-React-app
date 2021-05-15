const jwt=require('jsonwebtoken');
function auth(req,res,next)
{
	const token=req.cookies.token
	if(!token)
		return res.status(401).json({msg:"Unauthorized"});
	const authorized=jwt.verify(token,process.env.JWT_SECRET)
	if(!authorized)
	{
		return res.status(401).json({msg:"Unauthorized"});
	}
	if(!authorized.adminid)
		return res.status(401).json({msg:"Unauthorized"});
	req.user=authorized.adminid;
	next();
}
module.exports=auth;