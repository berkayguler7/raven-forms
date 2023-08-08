<template>
    <div>
        <h3>Create Form</h3>
        <label for="name">Form Name: </label>
        <input id="name" type="text" v-model="name">
        <label for="description">Description: </label>
        <textarea id="description" v-model="description"></textarea>
        <div v-for="(question, i) in questions" :key="i">
            <label for="question">Question {{ i + 1 }}: </label>
            <textarea id="question" v-model="question.question"></textarea>
            <br>
            <label for="type">Type: </label>
            <select id="type" v-model="question.type" @change="selectType($event, question)" >
                <option value="text">Text</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
            </select>

            <div v-if="question.type === 'radio'">
                <div v-for="(answerOption, index) in question.answerOptions" :key="index">
                    <input type="radio" :value="answerOption">
                    <input type="text" v-model="question.answerOptions[index]">
                </div>
            </div>
            
            <div v-if="question.type === 'checkbox'">
                <div v-for="(answerOption, index) in question.answerOptions" :key="index">
                    <input type="checkbox" :value="answerOption">
                    <input type="text" v-model="question.answerOptions[index]">
                </div>
            </div>
            <button @click="addAnswerOption(question)">Add Answer Option</button>

            <br>
            <label for="required">Required</label>
            <input id="required" type="checkbox" v-model="question.required">



            
        </div>
        <button @click="addQuestion">Add Question</button>
    </div>
</template>

<script>
export default {
    name: "CreateForm",
    data() {
        return {
            name: "",
            description: "",
            questions: [],
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({
                question: "",
                type: "text",
                answerOptions: [],
                answer: "",
                required: false,
            });
            this.name = "";
            this.description = "";
        },
        selectType(event, question) {
            question.type = event.target.value;
        },
        addAnswerOption(question) {
            question.answerOptions.push("");
        },
    },
};
</script>

<style scoped>
    
</style>