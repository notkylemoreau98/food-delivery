import express, { Request, Response, NextFunction } from 'express';
import { CreateVendor, GetVendors, GetVendorByID } from '../controllers';

const router = express.Router();

router.post('/Vendor', CreateVendor);
router.get('/Vendors', GetVendors);
router.get('/Vendor/:id', GetVendorByID);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'Hello from admin route' });
});

export { router as AdminRoute };
