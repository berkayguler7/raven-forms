<template>
	<div class="container mt-4">
		<div class="row">
			<div class="col-sm-12">
				<form>
					<div v-if="is_fetched">
						<h1>{{ name }}</h1>
						<div v-for="(question, index) in questions" :key="index">
							<div class="row">
								<question-component class="col" :questionNumber="index + 1" :formType="formType"
									:question="question" @selectAnswer="selectAnswer($event, question)" />
							</div>

						</div>
						<br /><br />
						<button @click="submitForm">Submit</button>
					</div>
					<div v-else>
						<h3>Loading...</h3>
						<div class="spinner-border" role="status">
							
						</div>
					</div>
					<form-timer deadline="06 Sep 2023 15:00:00 GMT+3"> </form-timer>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import QuestionComponent from "./QuestionComponent.vue";
import FormTimer from "./FormTimer.vue";
export default {
	name: "FormComponent",
	components: {
		QuestionComponent,
		FormTimer,
	},
	data() {
		return {
			is_fetched: false,
			id: "",
			name: "",
			description: "",
			formType: "",
			author: "",
			questions: [],
			questionAnswers: [],
		};
	},
	created() {
		this.id = this.$route.params.id;
		this.getQuestions();
	},
	methods: {
		async getQuestions() {
			const response = await axios.get(
				`http://localhost:3000/api/form/${this.id}`
			);

			this.$notify({
				text: response.data.message,
				type: response.data.type,
			});

			// sleep for 2 seconds
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (response.data.type === "warn") {
				this.$router.push("/dashboard");
				return;
			}
			this.name = response.data.form.name;
			this.description = response.data.form.description;
			this.formType = response.data.form.formType;
			this.author = response.data.form.author;
			this.questions = response.data.questions;
			this.is_fetched = true;
			for (let question of this.questions) {
				this.questionAnswers[question._id] = [];
			}
			console.log(response.data)
		},
		async submitForm(e) {
			e.preventDefault();
			let answers = Object.keys(this.questionAnswers).map((key) => {
				return {
					question: key,
					answers: this.questionAnswers[key],
					questionType: this.questions.find((q) => q._id === key).type,
				};
			});

			console.log(answers);
			let response = await axios.post(`http://localhost:3000/api/form/submit/`, {
				formId: this.id,
				questionAnswers: answers,
			});
			this.$notify({
				text: response.data.message,
				type: response.data.type,
			});
			// sleep for 2 seconds
			await new Promise((resolve) => setTimeout(resolve, 2000));

			if (response.data.type === "success") {
				this.$router.push("/dashboard");
			}

		},
		selectAnswer(answerOption, question) {
			if (question.type === "checkbox") {
				if (this.questionAnswers[question._id] === undefined) {
					console.error("questionanswers is undefined");
				}
				if (this.questionAnswers[question._id].includes(answerOption)) {
					this.questionAnswers[question._id] = this.questionAnswers[
						question._id
					].filter((answer) => answer !== answerOption);
				} else {
					this.questionAnswers[question._id].push(answerOption);
				}
			} else {
				this.questionAnswers[question._id] = [];
				this.questionAnswers[question._id].push(answerOption);
			}
		},
	},
};
</script>
