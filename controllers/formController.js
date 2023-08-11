import Form from "../models/Form.js";
import Question from "../models/Question.js";
import User from "../models/User.js";

const createForm = async (req, res) => {
    try {
        const questions = req.body.questions.map(question => {
            return new Question({
                ...question,
            });
        });

        await Question.insertMany(questions);

        const form = await Form.create({
            ...req.body,
            questions: questions.map(question => question._id),
            author: req.session.userID,
        });

        res.status(200).json({
            message: 'Form created successfully',
            type: 'success',
            form,
        });
    } catch (error) {
        res.status(400).json({
            type: 'warn',
            message: error,
        });
    }
}

const getForms = async (req, res) => {
    try {
        const forms = await Form.find({}).populate('author');
        res.status(200).json({
            message: 'Forms fetched successfully',
            type: 'success',
            forms,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Forms couldn't be fetched",
        });
    }
}

const getForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('author');
        // questions don't have a form field
        const questions = await Question.find().where('_id').in(form.questions).exec();
        res.status(200).json({
            message: 'Form fetched successfully',
            type: 'success',
            form,
            questions: questions.map(question => {
                return {
                    question: question.question,
                    type: question.type,
                    // no answer
                    answerOptions: question.answerOptions,
                    required: question.required,
                    _id: question._id,
                }
            }
            ),
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Form couldn't be fetched",
        });
    }
}

const updateForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('category').populate('author');
        form.name = req.body.name;
        form.description = req.body.description;
        form.category = req.body.category;
        const questions = req.body.questions.map(question => {
            return new Question({
                ...question,
                form: form._id,
            });
        });
        await Question.insertMany(questions);

        const removedQuestions = req.body.removedQuestions;
        await Question.deleteMany({ _id: { $in: removedQuestions } });

        const updatedForm = await form.save();

        res.status(200).json({
            message: 'Form updated successfully',
            type: 'success',
            form: updatedForm,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Form couldn't be updated",
        });
    }
}

const deleteForm = async (req, res) => {
    try {
        await Form.findByIdAndDelete(req.params.id);
        await Question.deleteMany({ form: req.params.id });
        res.status(200).json({
            message: 'Form deleted successfully',
            type: 'success',
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Form couldn't be deleted",
        });
    }
}

const submitForm = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(400).json({
            type: 'warn',
            message: "Form couldn't be submitted",
        });
    }
}

export {
    createForm,
    getForms,
    getForm,
    updateForm,
    deleteForm,
}
