import { Router } from 'express';
import { createUser, loginUser, logoutUser, deleteUser, getUsers, verifyUser, getUsersByQuiz, updateQuizResults, getSelfSurveys } from '../controllers/userController.js';

const router = Router();

router.route('/signup').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/:id').delete(deleteUser);
router.route('/all').get(getUsers);
router.route('/verify').get(verifyUser);
router.route('/getUsersByQuiz/:id').get(getUsersByQuiz);
router.route('/updateQuizResults').put(updateQuizResults);
router.route('/getSelfSurveys').get(getSelfSurveys);


export default router;
