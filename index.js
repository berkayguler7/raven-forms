import express, { json } from 'express';
import session from 'express-session';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import userRouter from './routes/User.js';

//GLOBAL VARIABLE TO TRACK USER SESSION
global.userIN = null;

// DOTENV CONFIG
config();

// CREATE EXPRESS APP
const app = express()

// MIDDLEWARES
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
})) // to allow cross origin requests
app.use(json()) // to convert the request into JSON
app.use(express.urlencoded({ extended: true })) // to convert the request into urlencoded
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
})) // to create a session

// ROUTES
app.use('/api/user', userRouter);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

// Logger
app.use((req, res, next) => {
    userIN = req.session.userID;
    console.table({
        request: {
            METHOD: req.method,
            URL: req.url,
            IP: req.ip,
            USER_ID: req.session.userID,
            SESSION_ID: req.sessionID,
            ROLE: req.session.userRole,
        },
    });
    next();
});

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))