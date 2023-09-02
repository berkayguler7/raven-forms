import { Schema, model } from 'mongoose';

const SurveyStatsSchema = new Schema(
    {
        form: {
            type: Schema.Types.ObjectId,
            ref: 'Form',
        },
        questionStats: [
            {
                question: {
                    type: Schema.Types.ObjectId,
                    ref: 'Question',
                },
                // the number of times each answer was chosen
                answerStats: [
                    {
                        answer: {
                            type: String,
                        },
                        count: {
                            type: Number,
                            default: 0,
                        },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

const SurveyStats = model('SurveyStats', SurveyStatsSchema);
export default SurveyStats;