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
                select: false,
            },
        ],
        answerOptions: [
            {
                type: String,
            },
        ],
        required: {
            type: Boolean,
            default: false,
        },
        form: {
            type: Schema.Types.ObjectId,
            ref: 'Form',
        },
        points: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Question = model('Question', QuestionSchema);
export default Question;