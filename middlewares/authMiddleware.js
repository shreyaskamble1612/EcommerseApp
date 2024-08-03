import JWT from 'jsonwebtoken'

//Protected route toke based

export const requireSignIn = async (req,res,next) => {
    try{
        if(!req.headers.authorization){
            return res.status(400).send({
                success:false,
                message:'Token is required'
            })
        }
        const token = req.headers.authorization;
        const decoded = JWT.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Server error',
            error
        })
    }
}
//Admin
export const isAdmin =async (req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:'Unauthorised access'
            })
        }else{
            next()
        }
    }catch(error){
        console.log(error)
    }

}