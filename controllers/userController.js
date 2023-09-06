import User from '../models/User.js';
import { compare } from 'bcrypt';
import Form from '../models/Form.js';
import SurveyStats from '../models/SurveyStats.js';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(user);

        res.status(201).json(
            {
                message: 'User created successfully',
                type: 'success',
            }
        )
    } catch (e) {
        console.log(e);
        let error = e.message
            .slice(24)
            .split(',')
            .map((err) => err.trim())
        console.log(error);
        res.status(400).json(
            {
                message: error,
                type: 'warn',
            }
        )
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (user) {
            compare(password, user.password, (err, same) => {
                if (same) {
                    //console.table({loggedin: {Username: user.name, EMail: user.email, Role: user.role}});
                    req.session.userID = user._id;
                    req.session.userRole = user.role;
                    req.session.userName = user.name;
                    res.cookie('sid', req.sessionID, {
                        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                        httpOnly: true,
                        secure: false,
                    });
                    res.status(200).json({
                        message: 'Logged in successfully',
                        type: 'success',
                        userID: req.session.userID,
                        userRole: req.session.userRole,
                        userName: req.session.userName,
                    })
                } else {
                    res.status(400).json({
                        message: 'Incorrect password.',
                        type: 'warn',
                    })//.redirect('/login');
                }
            });
        } else {
            res.status(400).json({
                message: 'User does not exist.',
                type: 'warn',
            })//.redirect('/login');
        }
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('sid');
        res.status(200).json({
            message: 'Logged out successfully',
            type: 'success',
        })
    });
};

const deleteUser = async (req, res) => {
    if (req.session.userRole !== 'admin') return res.status(401).json({
        type: 'warn',
        message: 'You are not authorized.',
    });
    try {
        await User.findByIdAndRemove(req.params.id)
        await Form.deleteMany({ creator: req.params.id })
        res.status(200).json(
            {
                message: 'User deleted successfully',
                type: 'success',
            }
        );
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        if (req.session.userRole !== 'admin') return res.status(401).json({ type: 'warn', message: 'You are not authorized.' });
        const users = await User.find();
        res.status(200).json({
            users: users.map((user) => {
                return {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user._id,
                };
            }),
        });
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const verifyUser = async (req, res) => {
    try {
        if (req.session.userID) {
            res.status(200).json({
                status: 'ok',
                message: 'User is logged in',
                type: 'success',
                userID: req.session.userID,
                userRole: req.session.userRole,
                userName: req.session.userName,
            });
        } else {
            res.json({
                status: 'error',
                message: 'User is not logged in',
                type: 'warn',
            });
        }
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const getUsersByQuiz = async (req, res) => {
    try {
        const users = await User.find({ answeredForms: { $elemMatch: { form: req.params.id } } });
        const form = await Form.findById(req.params.id).populate('questions', '+answers');

        res.status(200).json({
            users: users.map((user) => {
                return {
                    name: user.name,
                    email: user.email,
                    id: user._id,
                    userAnswers: user.answeredForms.find((answeredForm) => answeredForm.form == req.params.id),
                };
            }),
            form: form,
            type: 'success',
            text: 'Users found successfully'
        });
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const updateQuizResults = async (req, res) => {
    /* 
        Incoming data:
        {
            userAnswers: this.user.userAnswers,
            quizId: this.quizId,
            userId: this.user.id
        }
    */
    try {
        const user = await User.findById(req.body.userId);
        let currentForm = user.answeredForms.find((answeredForm) => answeredForm.form == req.body.quizId);
        currentForm.questionAnswers = req.body.userAnswers.questionAnswers;
        currentForm.score = req.body.userAnswers.score;
        await user.save();
        res.status(200).json({
            type: 'success',
            message: 'User answers updated successfully',
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
};

const getSelfSurveys = async (req, res) => {
    try {
        const surveys = await Form.find({ author: req.session.userID, formType: 'Survey' });
        res.status(200).json({
            surveys: surveys,
            type: 'success',
            text: 'Surveys found successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            type: 'warn',
            message: 'There was an error getting the surveys',
        });
    }
};

export { createUser, loginUser, logoutUser, deleteUser, getUsers, verifyUser, getUsersByQuiz, updateQuizResults, getSelfSurveys }