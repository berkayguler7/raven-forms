import { Router } from 'express';
import { createUser, loginUser, logoutUser, deleteUser, getUsers, verifyUser } from '../controllers/userController.js';

const router = Router();

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/:id').delete(deleteUser);
router.route('/all').get(getUsers);
router.route('/verify').get(verifyUser);

export default router;
