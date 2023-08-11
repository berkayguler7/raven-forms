import { Router } from 'express';
import { createForm, getForms, getForm, updateForm, deleteForm } from '../controllers/formController.js';

const router = Router();

router.route('/all').get(getForms);
router.route('/create').post(createForm);
router.route('/:id').get(getForm).put(updateForm).delete(deleteForm);

export default router;
