import { Router } from 'express';
import { createForm, getForms, getForm, updateForm, deleteForm } from '../controllers/formController.js';

const router = Router();

router.route('/').get(getForms).post(createForm);
router.route('/:id').get(getForm).put(updateForm).delete(deleteForm);

export default router;
