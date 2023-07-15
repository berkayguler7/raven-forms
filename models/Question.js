import { Schema, model } from 'mongoose';

const QuestionSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['text', 'radio', 'checkbox'],
            default: 'text',
        },
        answers: [
            {
                type: String,
            },
        ],
        required: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Question = model('Question', QuestionSchema);
export default Question;