import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { AuthPayload, VendorPayload } from '../dto';
import { Request } from 'express';

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt?: string) => {
  // return await bcrypt.hash(password, salt);
  return password;
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: any
  // salt: any
) => {
  return (await GeneratePassword(enteredPassword)) === savedPassword;
};

export const GenerateSignature = (payload: VendorPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const ValidateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (signature) {
    const payload = (await jwt.verify(
      signature.split(' ')[1],
      JWT_SECRET
    )) as AuthPayload;

    // @ts-ignore
    req.user = payload;

    return true;
  }

  return false;
};
