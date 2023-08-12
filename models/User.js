import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import mongooseUniqueValidator from "mongoose-unique-validator";

const nameValidator = [
    { validator: validator.isAlphanumeric, msg: 'Usernames may only have letters and numbers.' },
    { validator: validator.isLength, msg: 'Username should be between 6 and 20 characters', args: [6, 20] },
]

const emailValidator = [
    { validator: validator.isEmail, msg: 'Enter a valid email address.' },
    { validator: validator.isLength, msg: 'Email should be at least three characters', args: 3 },
]

const passwordValidator = [
    { validator: validator.isLength, msg: 'Password should be between 6 and 20 characters', args: [6, 20] },
]

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: nameValidator,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: emailValidator,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should be at least six characters']
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user',
    },
    authoredForms: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Form',
        },
    ],
    answeredForms: [{
        form: {
            type: Schema.Types.ObjectId,
            ref: 'Form',
        },
        questionAnswers: [
            {
                question: {
                    type: Schema.Types.ObjectId,
                    ref: 'Question',
                },
                answers: [{
                    type: String,
                }],
            },
        ],
    }],
},
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

UserSchema.plugin(mongooseUniqueValidator, { message: '{VALUE} is already in use.' });

const User = model('User', UserSchema);
export default User;
