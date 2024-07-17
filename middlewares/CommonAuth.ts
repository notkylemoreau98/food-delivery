import { Request, Response, NextFunction } from 'express';
import { AuthPayload } from '../dto';
import { ValidateSignature } from '../utils';

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isValid = await ValidateSignature(req);

  if (isValid) {
    next();
  } else {
    return res.json({ message: 'User not authenticated' });
  }
};
