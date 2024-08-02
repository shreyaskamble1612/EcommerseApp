import { hashPassword,comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;
        
        ///validation
        if(!name || !email || !password || !phone || !address){
            return res.status(400).send({
                success:false,
                message:'All fields should be filled'
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
        //register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({
            name,
            email,
            password:hashedPassword,
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


export const loginController = async (req,res) => {
    try{

        const {email,password} = req.body;
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'All fields are required truely'
            })
        }
        //check if user exists
        const user = await userModel.findOne({
            email
        });
        
        //user not found
        if(!user){
            return res.status(400).send({
                success:false,
                message:'user not found'

            })
        }
        //compare password
        const isMatch = await comparePassword(password,user.password);
        if(!isMatch){
            return res.status(200).send({
                success:false,
                message:'Invalid credentials'

            })

        }
        //generate token
        const token = jwt.sign({
            _id:user._id
            
        },process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRE
        });
        res.status(200).send({
            success:true,
            message:'Login successful',
            user: {
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address
            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Login Error',
            error
        })
    }
}


export const testController = async (req,res) => {
    try{
        res.send("Protected Routes");

    }catch(error){
        console.log(error)
        res.send({error})

    }
}