import mongoose, { Schema, Document, Model } from 'mongoose';

interface VendorDoc extends Document {
  name: String;
  ownerName: String;
  foodType: [String];
  pincode: String;
  address: String;
  phone: String;
  email: String;
  password: String;
  salt: String;
  serviceAvailable: String;
  coverImages: [String];
  rating: Number;
  // foods: any;
}

const VendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean },
    coverImages: { type: [String] },
    rating: { type: Number },
    // foods: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'food' }],
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model<VendorDoc>('vendor', VendorSchema);

export { Vendor };
