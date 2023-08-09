import { Router } from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = Router();

router.route('/').get(getCategories);

export default router;