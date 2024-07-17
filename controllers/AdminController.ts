import { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto';
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utils';

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVendorInput>req.body;

  const existingVendor = await FindVendor('', email);

  if (existingVendor !== null) {
    return res.json({ message: 'A vendor already exists with this email ID' });
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
  });

  return res.json(createdVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors !== null && vendors.length > 0) {
    return res.json(vendors);
  } else {
    return res.json({ message: 'No Vendors Found' });
  }
};

export const GetVendorByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;

  const vendor = await FindVendor(vendorId);

  if (vendor !== null) {
    return res.json(vendor);
  } else {
    return res.json({ message: 'Vendor not found ' });
  }
};
