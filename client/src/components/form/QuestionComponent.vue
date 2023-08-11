<template>
	<div>
		<h4>{{ question.question }}</h4>
		<div v-if="question.type === 'text'">
			<input class="input" type="text" />
		</div>

		<div v-if="question.type === 'checkbox'">
			<div v-for="(answerOption, index) in question.answerOptions" :key="index">
				<input type="checkbox" :value="answerOption" />
				<label>{{ answerOption }}</label>
			</div>
		</div>

		<div v-if="question.type === 'radio'">
			<div v-for="(answerOption, index) in question.answerOptions" :key="index">
				<input type="radio" :value="answerOption" />
				<label>{{ answerOption }}</label>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "QuestionComponent",
	props: {
		question: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			answers: [],
		};
	},
};
</script>
