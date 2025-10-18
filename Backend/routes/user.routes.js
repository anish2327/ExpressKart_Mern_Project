import { Router } from 'express';
import { loginUser, registerUser, logoutController } from '../Controller/user.controller.js';


import auth from '../middleware/auth.js';

const userRouter = Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser );
userRouter.get("/logout",auth,logoutController)

export default userRouter;