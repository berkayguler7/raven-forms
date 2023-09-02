import { Router } from 'express';
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = Router();

router.route('/all').get(getCategories);
router.route('/create').post(createCategory);
router.route('/:slug').get(getCategory).put(updateCategory).delete(deleteCategory);

export default router;
