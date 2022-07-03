import express from 'express';
const router = express.Router();
import { productController } from '../controllers';
import { upload } from '../config/multer';
import { authorize } from '../middlewares';

router.get('/', authorize, productController.getProducts);
router.post('/', authorize, upload.single('productImage'), productController.addProduct);
router.put('/:id', authorize, productController.updateProduct);
router.delete('/:id', authorize, productController.deleteProduct);

export default router;
