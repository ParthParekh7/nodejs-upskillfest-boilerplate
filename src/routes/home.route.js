import express from 'express';
import { productRoute } from './product.route';

import { goggleLogin, checkGoggle } from '../controllers';
const router = express.Router();
// export default express
// 	.Router()
// 	/**
// 	 * @swagger

router.get('/', goggleLogin);
router.get('/auth/google/callback', checkGoggle);
export default router;
