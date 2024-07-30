import express from 'express'
import { registerController,loginController } from '../controllers/authController.js';
//Router object
const router = express.Router();

//routing

//register
router.post('/register',registerController);

//login || post
router.post('/login',loginController);
export default router;