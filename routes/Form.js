import { Router } from 'express';
import { createForm, getForms, getForm, updateForm, deleteForm, submitForm, getQuizzesByAuthor, getFormStats } from '../controllers/formController.js';

const router = Router();

router.route('/all').get(getForms);
router.route('/create').post(createForm);
router.route('/:id').get(getForm).put(updateForm).delete(deleteForm);
router.route('/submit').post(submitForm);
router.route('/getQuizzesByAuthor/:id').get(getQuizzesByAuthor);
router.route('/getFormStats/:id').get(getFormStats);

export default router;
