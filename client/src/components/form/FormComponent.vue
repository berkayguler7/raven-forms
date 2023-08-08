<template>
	<form>
		<h3>Form</h3>
		<div v-for="(question, index) in questions" :key="index">
			<h4>{{ question.question }}</h4>
			<input
				v-if="question.type === 'text'"
				id="textAnswer"
				type="text"
				placeholder="Type your answer here"
			/>
			<div v-if="question.type === 'radio'">
				<input
					v-for="(answerOption, index) in answerOptions"
					:key="index"
					type="radio"
                    :value="answerOption"
				/>
			</div>
		</div>
	</form>
</template>

<script>
import axios from "axios";
export default {
	name: "FormComponent",
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			questions: [],
			answerOptions: [],
		};
	},
	created() {
		this.getQuestions();
	},
	methods: {
		getQuestions() {
			axios
				.get(`http://localhost:3000/api/forms/${this.id}`)
				.then((response) => {
					this.questions = response.data.questions;
					this.answerOptions = response.data.answerOptions;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
