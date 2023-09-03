import express, { json } from 'express';
import session from 'express-session';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';

// DOTENV CONFIG
config();

// CREATE EXPRESS APP
const app = express()

// MIDDLEWARES
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
    exposedHeaders: ['set-cookie'],
})) // to allow cross origin requests
app.use(json()) // to convert the request into JSON
app.use(cookieParser()) // to parse the cookies
app.use(express.urlencoded({ extended: true })) // to convert the request into urlencoded

app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
     },
})) // to create a session

// Logger
app.use((req, res, next) => {
    // console.table({
    //     request: {
    //         METHOD: req.method,
    //         URL: req.url,
    //         IP: req.ip,
    //         USER_NAME: req.session.userName,
    //         USER_ID: req.session.userID,
    //         SESSION_ID: req.sessionID,
    //         ROLE: req.session.userRole,
    //     },
    // });
    console.log(req.method, req.url, req.ip, req.session.userName, req.session.userRole, req.session.userID, req.sessionID)
    next();
});

// ROUTES
import userRouter from './routes/User.js';
import formRouter from './routes/Form.js';
import categoryRouter from './routes/Category.js';
app.use('/api/user', userRouter);
app.use('/api/form', formRouter);
app.use('/api/category', categoryRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));



connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))
