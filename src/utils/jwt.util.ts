import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

interface TokenPayload {
  userId: number;
  email: string;
  username: string;
}
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
