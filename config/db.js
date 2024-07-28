import mongoose from "mongoose";
import colors from 'colors'

const dbConnect = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgMagenta.white)
    } catch(error){
        console.log(`Error in MongoDB ${error}`);
    }
}
  
export default dbConnect;