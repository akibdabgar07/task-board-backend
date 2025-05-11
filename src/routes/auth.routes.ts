import { Router } from 'express';
import {
  loginController,
  registerController,
} from '../controllers/auth.controller';
import { validateData } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validators/auth.validator';

const authRouter = Router();
authRouter.post('/register', validateData(registerSchema), registerController);
authRouter.post('/login', validateData(loginSchema), loginController);

export default authRouter;
