import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.util';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number; username: string; email: string };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided' });
  } else {
    const token = authHeader.split(' ')[1];
    debugger;
    try {
      const decoded = verifyToken(token);
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      };

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
};
