import User from '../models/User.js';
import { compare } from 'bcrypt';
import Form from '../models/Form.js';

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
        const user = await User.findOne({ email });

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
    if (req.session.userID) {
        console.log('Logged out');
    }
    req.session.destroy(() => {
        res.clearCookie('sid');
        res.status(200).json({
            message: 'Logged out successfully',
            type: 'success',
        })
    });
};

const deleteUser = async (req, res) => {
    if(req.session.userRole !== 'admin') return res.status(401).json({
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
        if(req.session.userRole !== 'admin') return res.status(401).json({ type: 'warn', message: 'You are not authorized.' });
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
            });
        } else {
            res.status(401).json({
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


export { createUser, loginUser, logoutUser, deleteUser, getUsers, verifyUser }