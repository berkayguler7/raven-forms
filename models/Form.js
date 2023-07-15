import { Schema, model } from "mongoose";

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
    },
    {
        timestamps: true,
    }
);

const Form = model('Form', FormSchema);
export default Form;