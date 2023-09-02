import Form from "../models/Form.js";
import Question from "../models/Question.js";
import User from "../models/User.js";
import SurveyStats from "../models/SurveyStats.js";

const createForm = async (req, res) => {
	const questions = req.body.questions.map((question) => {
		return new Question({
			...question,
		});
	});
	await Question.insertMany(questions);

	if (req.body.formType === "Quiz") {
		try {
			const form = await Form.create({
				...req.body,
				questions: questions.map((question) => question._id),
				author: req.session.userID,
				totalPoints: questions.reduce(
					(total, question) => total + question.points,
					0
				),
			});

			res.status(200).json({
				message: "Form created successfully",
				type: "success",
				form,
			});
		} catch (error) {
			res.status(400).json({
				type: "warn",
				message: error,
			});
		}
	} else {
		// add to survey stats
		try {
			const form = await Form.create({
				...req.body,
				questions: questions.map((question) => question._id),
				author: req.session.userID,
			});

			await SurveyStats.create({
				form: form._id,
				questionStats: questions.map((question) => {
					return {
						question: question._id,
						answerStats: question.answerOptions.map((answerOption) => {
							return {
								answer: answerOption,
								count: 0,
							};
						}),
					};
				}),
			});
			res.status(200).json({
				message: "Form created successfully",
				type: "success",
				form,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				type: "warn",
				message: "Internal server error.",
			});
		}
	}
};

const getForms = async (req, res) => {
	try {
		const forms = await Form.find({});
		res.status(200).json({
			message: "Forms fetched successfully",
			type: "success",
			forms,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			type: "warn",
			message: "Forms couldn't be fetched",
		});
	}
};

const getForm = async (req, res) => {
	try {
		const user = await User.findById(req.session.userID);
		const answeredForm = user.answeredForms.find(
			(answeredForm) => answeredForm.form == req.params.id
		);
		if (answeredForm)
			return res.status(201).json({
				type: "warn",
				message: "You have already answered this form.",
			});

		const form = await Form.findById(req.params.id);
		const questions = await Question.find()
			.where("_id")
			.in(form.questions)
			.exec();
		let queriedAuthor = await User.findById(form.author);
		form.author = queriedAuthor.name;
		console.log(form);

		res.status(200).json({
			message: "Form fetched successfully",
			type: "success",
			form,
			questions: questions.map((question) => {
				return {
					question: question.question,
					type: question.type,
					// no answer
					points: question.points,
					answerOptions: question.answerOptions,
					required: question.required,
					_id: question._id,
				};
			}),
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			type: "warn",
			message: "Form couldn't be fetched",
		});
	}
};

const updateForm = async (req, res) => {
	try {
		const form = await Form.findById(req.params.id)
			.populate("category")
			.populate("author");
		form.name = req.body.name;
		form.description = req.body.description;
		form.category = req.body.category;
		const questions = req.body.questions.map((question) => {
			return new Question({
				...question,
				form: form._id,
			});
		});
		console.log(questions);
		await Question.insertMany(questions);

		const removedQuestions = req.body.removedQuestions;
		await Question.deleteMany({ _id: { $in: removedQuestions } });

		const updatedForm = await form.save();

		res.status(200).json({
			message: "Form updated successfully",
			type: "success",
			form: updatedForm,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			type: "warn",
			message: "Form couldn't be updated",
		});
	}
};

const deleteForm = async (req, res) => {
	try {
		await Form.findByIdAndDelete(req.params.id);
		await Question.deleteMany({ form: req.params.id });
		res.status(200).json({
			message: "Form deleted successfully",
			type: "success",
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			type: "warn",
			message: "Form couldn't be deleted",
		});
	}
};

const submitForm = async (req, res) => {
	if (!req.session.userID)
		return res.status(401).json({
			type: "warn",
			message: "You are not authorized.",
		});

	const user = await User.findById(req.session.userID);

	const answeredForm = user.answeredForms.find(
		(answeredForm) => answeredForm.form == req.body.formId
	);
	if (answeredForm)
		return res.status(401).json({
			type: "warn",
			message: "You have already answered this form.",
		});

	const form = await Form.findById(req.body.formId);
	if (!form)
		return res.status(401).json({
			type: "warn",
			message: "Form does not exist.",
		});

	if (form.formType === "Quiz") {
		try {
			const questions = await Question.find()
				.where("_id")
				.in(form.questions)
				.select("+answers")
				.exec();
			if (questions.length !== form.questions.length)
				return res.status(401).json({
					type: "warn",
					message: "Some questions are missing.",
				});

			let questionAnswerScores = [];

			for (let i = 0; i < questions.length; i++) {
				const question = questions[i];
				console.log("question", question);
				const fAnswer = req.body.questionAnswers.find(
					(answer) => answer.question === question._id.toString()
				);
				console.log("fAnswer", fAnswer);
				questionAnswerScores.push({
					question: fAnswer.question,
					answers: fAnswer.answers,
					points:
						JSON.stringify(question.answers.sort()) ===
						JSON.stringify(fAnswer.answers.sort())
							? question.points
							: 0,
				});
			}

			user.answeredForms.push({
				form: req.body.formId,
				questionAnswers: questionAnswerScores,
				score: questionAnswerScores.reduce(
					(total, questionAnswer) => total + questionAnswer.points,
					0
				),
			});

			await user.save();

			res.status(200).json({
				message: "Form submitted successfully",
				type: "success",
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({
				type: "warn",
				message: "Form couldn't be submitted",
			});
		}
	} else if (form.formType === "Survey") {
		// add to survey stats
		try {
			// update survey stats, make sure to check multiple answers
			const surveyStats = await SurveyStats.findOne({ form: req.body.formId });
            surveyStats.questionStats.forEach((questionStat) => {
                const fAnswer = req.body.questionAnswers.find(
                    (answer) => answer.question === questionStat.question.toString()
                );
                fAnswer.answers.forEach((answer) => {
                    const answerStat = questionStat.answerStats.find(
                        (answerStat) => answerStat.answer === answer
                    );
                    answerStat.count++;
                });
            });
            await surveyStats.save();


			console.log(surveyStats);
		} catch (error) {
			console.log(error);
			res.status(400).json({
				type: "warn",
				message: "Form couldn't be submitted",
			});
		}
	}
};

export { createForm, getForms, getForm, updateForm, deleteForm, submitForm };
