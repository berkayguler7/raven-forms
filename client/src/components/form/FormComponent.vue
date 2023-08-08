<template>
	<form>
		<h3>Form</h3>
		<div v-for="(question, index) in questions" :key="index">
			<h4>{{ question.question }}</h4>
			<input
				v-if="question.type === 'text'"
				id="textAnswer"
				type="text"
				:placeholder="Type your answer here"
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
export default {
	props: {
		questions: {
			type: Array,
			required: true,
		},
	},
};
</script>
