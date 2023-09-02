import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const FormSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        formType: {
            type: String,
            enum: ['Survey', 'Quiz'],
            default: 'Survey',
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Question',
            },
        ],
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                select: false,
            },
        ],
        totalPoints: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

FormSchema.plugin(mongooseUniqueValidator, { message: '{VALUE} is already in use.' });

const Form = model('Form', FormSchema);
export default Form;