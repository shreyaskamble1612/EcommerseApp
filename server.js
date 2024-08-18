import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dbConnect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

//config env
dotenv.config();

//connect db
dbConnect();


//rest object
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/auth',authRoutes)
//resta api
app.get('/',(req,res)=>{
    res.send({
        message: 'Hello World'
    });
})

//PORT
const port = process.env.PORT || 5000;

// run listen
app.listen(port,()=>{
    console.log(`Server running on port ${port}`.bgCyan.white)
});