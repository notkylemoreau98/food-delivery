import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { AdminRoute, VendorRoute } from './routes';
import { MONGO_URI } from './config';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/Vendor', VendorRoute);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('ERROR: ', err));

app.listen(PORT, () => {
  console.clear();
  console.log(`App is listening on Port ${PORT}`);
});
