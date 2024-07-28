import userModel from "../models/userModel";
export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        
        ///validation
        if(!name || !email || !password || !phone || !address){
            return res.status(400).send({
                success:false,
                message:'All fields are required'
            });
        }

        //check if user already exists
        const userexisting = await userModel.findOne({email});
        //existing user
        if(userexisting){
            return res.status(200).send({
                success:true,
                message:'User already exists Please Login'
            })
        }
        const user = new userModel({
            name,
            email,
            password,
            phone,
            address
        });
        const data = await user.save();
        res.status(201).send({
            success:true,
            message:'User registered successfully',
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Internal server error',
            error
        })
        // 59 min
    }
};

