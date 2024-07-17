import { Request, Response, NextFunction } from 'express';
import { EditVendorInputs, VendorLoginInput } from '../dto';
import { GenerateSignature, ValidatePassword } from '../utils';
import { FindVendor } from './AdminController';

export const VendorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body as VendorLoginInput;

  const existingVendor = await FindVendor('', email);

  if (existingVendor !== null) {
    const isPasswordValid = await ValidatePassword(
      password,
      existingVendor.password
      // existingVendor.salt
    );

    if (isPasswordValid) {
      const signature = GenerateSignature({
        _id: existingVendor.id,
        email: existingVendor.email,
        foodTypes: existingVendor.foodType,
        name: existingVendor.name,
      });

      return res.json(signature);
    } else {
      return res.json({ message: 'Password does not match' });
    }
  }

  return res.json({ message: 'Invalid Login Credentials' });
};

export const GetVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);
    return res.json(existingVendor);
  }

  return res.json({ message: 'User Information not found' });
};

export const UpdateVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { foodTypes, name, address, phone } = req.body as EditVendorInputs;

  // @ts-ignore
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.name = name;
      existingVendor.address = address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodTypes;

      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }

  return res.json({ message: 'User Information not found' });
};

export const UpdateVendorService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const user = req.user;

  if (user) {
    const existingVendor = await FindVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;
      const savedResult = await existingVendor.save();

      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }

  return res.json({ message: 'User Information not found' });
};
