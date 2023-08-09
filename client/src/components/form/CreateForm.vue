<template>
    <div>
        <h3>Create Form</h3>
        <label for="name">Form Name: </label>
        <input id="name" type="text" v-model="name">
        <label for="description">Description: </label>
        <textarea id="description" v-model="description"></textarea>
        <br>
        <label for="formType">Form Type: </label>
        <select id="formType">
            <option v-for="(formType, index) in formTypes" :key="index" :value="formType">
                {{ formType }}
            </option>
        </select>
        <br>
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
                    <input type="radio" :name="question.question" :value="answerOption">
                    <input type="text" v-model="question.answerOptions[index]">
                    <button @click="removeAnswerOption(question, index)">Remove Answer Option</button>
                </div>
            </div>
            
            <div v-if="question.type === 'checkbox'">
                <div v-for="(answerOption, index) in question.answerOptions" :key="index">
                    <input type="checkbox" :value="answerOption" @change="changeCheckboxAnswer($event, question)">
                    <input type="text" v-model="question.answerOptions[index]">
                    <button @click="removeAnswerOption(question, index)">Remove Answer Option</button>
                </div>
            </div>
            <button @click="addAnswerOption(question)">Add Answer Option</button>
            <br>
            <label for="required">Required</label>
            <input id="required" type="checkbox" v-model="question.required">
            <button @click="removeQuestion(i)">Remove Question</button>
        </div>
        <button @click="addQuestion">Add Question</button>

        <br>
        <button @click="submitForm">Submit</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "CreateForm",
    data() {
        return {
            name: "",
            description: "",
            questions: [],
            formTypes: ["Survey", "Quiz"],
        };
    },
    methods: {
        changeCheckboxAnswer(event, question) {
            if (event.target.checked) {
                question.answer.push(event.target.value);
            } else {
                question.answer = question.answer.filter((answer) => answer !== event.target.value);
            }
            console.log(question.answer);
        },
        addQuestion() {
            this.questions.push({
                question: "",
                type: "text",
                answerOptions: [],
                answer: [],
                required: false,
            });
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        selectType(event, question) {
            question.type = event.target.value;
        },
        addAnswerOption(question) {
            question.answerOptions.push("");
        },
        removeAnswerOption(question, index) {
            question.answerOptions.splice(index, 1);
        },
        async submitForm() {
            if (this.name === "") {
                this.$notify({
                    group: "error",
                    title: "Error",
                    text: "Please enter a name for the form",
                });
                return;
            }
            if (this.description === "") {
                this.$notify({
                    group: "error",
                    title: "Error",
                    text: "Please enter a description for the form",
                });
                return;
            }
            if (this.questions.length === 0) {
                this.$notify({
                    group: "error",
                    title: "Error",
                    text: "Please enter at least one question",
                });
                return;
            }
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].question === "") {
                    this.$notify({
                        group: "error",
                        title: "Error",
                        text: "Please enter a question for question " + (i + 1),
                    });
                    return;
                }
                if (this.questions[i].type === "radio" || this.questions[i].type === "checkbox") {
                    if (this.questions[i].answerOptions.length === 0) {
                        this.$notify({
                            group: "error",
                            title: "Error",
                            text: "Please enter at least one answer option for question " + (i + 1),
                        });
                        return;
                    }
                    for (let j = 0; j < this.questions[i].answerOptions.length; j++) {
                        if (this.questions[i].answerOptions[j] === "") {
                            this.$notify({
                                group: "error",
                                title: "Error",
                                text: "Please enter an answer option for question " + (i + 1),
                            });
                            return;
                        }
                    }
                }
            }
            console.log({
                    name: this.name,
                    description: this.description,
                    questions: this.questions,
                    formType: document.getElementById("formType").value,
                })
            await axios
                .post("http://localhost:3000/api/form/create", {
                    name: this.name,
                    description: this.description,
                    questions: this.questions,
                    formType: document.getElementById("formType").value
                })
                .then((res) => {
                    this.$notify({
                        group: "success",
                        title: "Success",
                        text: "Form created successfully",
                    });
                    this.$router.push("/form/" + res.data._id);
                })
                .catch((err) => {
                    this.$notify({
                        group: "error",
                        title: "Error",
                        text: err.response.data.message,
                    });
                });
        }
    },
};
</script>

<style scoped>
    
</style>