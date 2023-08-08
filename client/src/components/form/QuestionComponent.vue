<template>
	<div class="form-group">
		<label :for="question.id">{{ question.question }}</label>
		<input
			v-if="question.type === 'text'"
			:id="question.id"
			:name="question.id"
			type="text"
			:placeholder="question.placeholder"
			class="form-control"
			v-model="question.answer"
		/>
		<div v-if="question.type === 'radio'">
			<input 
            v-for="(answerOption, index) in question.answerOptions"
            type="radio" 
            :id="answerOption"
            :name="question.id"
            :value="answerOption"
            v-model="question.answer"
            
            />
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
};
</script>
