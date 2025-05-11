// controllers/auth.controller.ts

import { Request, Response } from 'express';
import {
  createUserService,
  findUserByEmail,
  hashPasswordService,
  loginUser,
} from '../services/auth.service';
import { UserAttributes } from '../types/types';

export const registerController = async (req: Request, res: Response) => {
  try {
    debugger;
    const userInput: UserAttributes = req.body;

    const emailExists = await findUserByEmail(userInput.email);
    if (emailExists) {
      res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await hashPasswordService(userInput.password);

    const newUser = await createUserService({
      ...userInput,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        user_id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const tokenData = await loginUser(req.body);
    res.status(200).json({ message: 'Login successful', ...tokenData });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
};
