import { Request } from 'express';

export interface AuthenticatedUser {
  userId: number;
  username: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}
