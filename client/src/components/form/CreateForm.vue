<template>
    <div class="form">
        <h3>Create Form</h3>
        <input id="name" type="text" v-model="name" placeholder="Form Name">
        <textarea id="description" v-model="description" placeholder="Description"></textarea>
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
            <button v-if="question.type !== 'text'" class="btn btn-primary" @click="addAnswerOption(question)">Add Answer Option</button>
            <br>
            <label for="required">Required</label>
            <input id="required" type="checkbox" v-model="question.required">
            <br>
            <button class="delete-btn" @click="removeQuestion(i)">Remove Question</button>
        </div>
        <br><br>
        <button @click="addQuestion">Add Question</button>

        <br>
        <button class="submit-button" @click="createForm">Submit</button>
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
                question.answers.push(event.target.value);
            } else {
                question.answers = question.answers.filter((answers) => answers !== event.target.value);
            }
            console.log(question.answers);
        },
        addQuestion() {
            this.questions.push({
                question: "",
                type: "text",
                answerOptions: [],
                answers: [],
                required: false,
            });
        },
        removeQuestion(index) {
            this.questions.splice(index, 1);
        },
        selectType(event, question) {
            question.type = event.target.value;
            if (question.type === "text") {
                question.answerOptions = [];
            }
        },
        addAnswerOption(question) {
            question.answerOptions.push("");
        },
        removeAnswerOption(question, index) {
            question.answerOptions.splice(index, 1);
        },
        async createForm() {
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
                .then(() => {
                    this.$notify({
                        group: "success",
                        title: "Success",
                        text: "Form created successfully",
                    });
                    this.$router.push("/dashboard");
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
.form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

h3 {
	font-size: 22px;
	font-weight: bold;
	text-align: center;
}

.input {
	width: 100%;
	padding: 10px;
}

.submit-button {
	width: 400px;
	padding: 10px;
	background-color: #1976d2;
	color: white;
	cursor: pointer;
}

.delete-btn {
	background-color: #f44336;
	color: white;
	padding: 10px;
	cursor: pointer;
	border: none;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>