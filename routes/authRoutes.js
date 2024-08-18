import express from 'express'
import { registerController,loginController,testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//Router object
const router = express.Router();

//routing

//register
router.post('/register',registerController);

//login || post
router.post('/login',loginController);

//test || POST
router.get('/test',requireSignIn,isAdmin,testController);
export default router;

