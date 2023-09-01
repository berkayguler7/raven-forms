<template>
	<div>
		<div class="row">
			<h4>{{ questionNumber + '. ' + question.question }}</h4>
			<h4 v-if="formType == 'Quiz'" class="danger"> ({{ question.points }} Points)</h4>
		</div>

		<div v-if="question.type === 'text'">
			<input class="input" type="text" v-model="textValue" @change="$emit('selectAnswer', textValue)" />
		</div>

		<div v-if="question.type === 'checkbox'">
			<div v-for="(answerOption, index) in question.answerOptions" :key="index">
				<input type="checkbox" :value="answerOption" @change="$emit('selectAnswer', answerOption)" />
				<label>{{ answerOption }}</label>
			</div>
		</div>

		<div v-if="question.type === 'radio'">
			<div v-for="(answerOption, index) in question.answerOptions" :key="index">
				<input type="radio" :value="answerOption" @change="$emit('selectAnswer', answerOption)" 
				:name="question.question"/>
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
		formType: {
			type: String,
			required: true,
		},
		questionNumber: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			answers: [],
			textValue: "",
		};
	},
};
</script>
