import { Router } from 'express';
import { createUser, loginUser, logoutUser, deleteUser, getUsers } from '../controllers/userController.js';

const router = Router();

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/:id').delete(deleteUser);
router.route('/all').get(getUsers);

export default router;
