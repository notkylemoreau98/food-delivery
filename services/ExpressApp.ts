import express, { Application } from 'express';
import path from 'path';

import { AdminRoute, VendorRoute } from '../routes';
//import { CustomerRoute } from '../routes/CustomerRoute';
import { ShoppingRoute } from '../routes/ShoppingRoute';

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  const imagePath = path.join(__dirname, '../images');

  app.use('/images', express.static(imagePath));

  app.use('/admin', AdminRoute);
  app.use('/vendor', VendorRoute);
  // app.use('/customer', CustomerRoute)
  // app.use('/delivery', DeliveryRoute);
  app.use(ShoppingRoute);

  return app;
};
