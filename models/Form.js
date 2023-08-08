import { Schema, model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const FormSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
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
            },
        ],
    },
    {
        timestamps: true,
    }
);

FormSchema.plugin(mongooseUniqueValidator, { message: '{VALUE} is already in use.' });

const Form = model('Form', FormSchema);
export default Form;