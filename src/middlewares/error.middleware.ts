import { Request, Response, NextFunction } from 'express';

export const commonErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};
