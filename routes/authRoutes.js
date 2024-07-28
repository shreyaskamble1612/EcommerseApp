import express from 'express'

//Router object
const router = express.Router();

//routing

//register
router.post('/register',registerController);

export default router;