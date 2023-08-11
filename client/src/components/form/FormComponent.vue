<template>
	<form>
		<h3>Form</h3>
		<div v-if="is_fetched">
			<div v-for="(question, index) in questions" :key="index">
				<h2>Question {{ index + 1 }}</h2>
				<question-component :question="question" />
			</div>
		</div>

		<div v-else>
			<h3>Loading...</h3>
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>

		<br><br>
		<button @click="submitForm">Submit</button>

	</form>
</template>

<script>
import axios from "axios";
export default {
	name: "FormComponent",
	data() {
		return {
			is_fetched: false,
			id: "",
			name: "",
			description: "",
			formType: "",
			author: "",
			questions: [],
		};
	},
	created() {
		this.id = this.$route.params.id;
		this.getQuestions();
	},
	methods: {
		async getQuestions() {
			const response = await axios
				.get(`http://localhost:3000/api/form/${this.id}`)
			this.name = response.data.form.name,
			this.description = response.data.form.description,
			this.formType = response.data.form.formType,
			this.author = response.data.form.author,
			this.questions = response.data.questions
			this.is_fetched = true;
			console.log(this.questions)
		},
	},
};
</script>
