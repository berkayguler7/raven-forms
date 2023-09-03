<template>
    <div class="container-lg mt-4">
        <h3>Create Form</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Form Name</label>
            <input id="name" type="text" class="form-control" v-model="name" placeholder="Form Name" />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea id="description" class="form-control" v-model="description" placeholder="Description"></textarea>
        </div>
        <div class="mb-3">
            <label for="formType" class="form-label">Form Type</label>
            <select id="formType" class="form-select" v-model="formType">
                <option v-for="(formType, index) in formTypes" :key="index" :value="formType">
                    {{ formType }}
                </option>
            </select>
        </div>
        <div class="mb-3 row">
            <label for="category" class="form-label">Category</label>
            <select id="category" class="form-select col" v-model="category">
                <option v-for="(category, index) in categories" :key="index" :value="category._id">
                    {{ category.name }}
                </option>
            </select>
            <button class="btn btn-primary col" @click="addCategory">Add Category</button>
        </div>

        <div v-if="addingCategory">
            <category-modal @categoryCreated="getCategories" />
        </div>


        <h3>Questions</h3>
        <div v-for="(question, i) in questions" :key="i" class="mb-4">
            <h5>Question {{ i + 1 }}</h5>
            <div class="mb-3">
                <label for="question" class="form-label">Question</label>
                <textarea id="question" class="form-control" v-model="question.question"></textarea>
            </div>
            <div class="mb-3">
                <label for="type" class="form-label">Type</label>
                <select id="type" class="form-select" v-model="question.type" @change="selectType($event, question)">
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                </select>
            </div>
            <div v-if="question.type === 'radio'" class="mb-3">
                <div v-for="(answerOption, index) in question.answerOptions" :key="index" class="d-flex align-items-center">
                    <div class="form-check">
                        <input :type="question.type" :value="answerOption" :name="'option-' + i"
                            class="form-check-input custom-radio" :id="`option-${i}-${index}`"
                            @change="setAnswer($event, question)">
                    </div>
                    <input type="text" class="form-control" v-model="question.answerOptions[index]">
                    <button class="btn btn-danger" @click="removeAnswerOption(question, index)">Remove Answer
                        Option</button>
                </div>
            </div>
            <div v-if="question.type === 'checkbox'" class="mb-3">
                <div v-for="(answerOption, index) in question.answerOptions" :key="index" class="d-flex align-items-center">
                    <div class="form-check">
                        <input :type="question.type" :value="answerOption" class="form-check-input"
                            :id="`option-${i}-${index}`" @change="setAnswer($event, question)">
                    </div>
                    <input type="text" class="form-control" v-model="question.answerOptions[index]">
                    <button class="btn btn-danger" @click="removeAnswerOption(question, index)">Remove Answer
                        Option</button>
                    <br><br>
                </div>
            </div>
            <button v-if="question.type !== 'text'" class="btn btn-primary me-2" @click="addAnswerOption(question)">
                Add Answer Option
            </button>
            <div class="mb-3" v-if="formType == 'Quiz'">
                <label for="points" class="form-label">Points</label>
                <input id="points" type="number" class="form-control" v-model="question.points" min="0" max="100" />
            </div>
            <div class="mt-3 mb-3 form-check">
                <input id="required" type="checkbox" class="form-check-input" v-model="question.required" />
                <label for="required" class="form-check-label">Required</label>
            </div>

            <button class="btn btn-danger" @click="removeQuestion(i)">
                Remove Question
            </button>
        </div>
        <div class="mb-3 d-flex justify-content-between">
            <button class="btn btn-primary" @click="addQuestion">Add Question</button>
            <button class="btn btn-success" @click="createForm">Submit</button>
        </div>
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
            formType: "Survey",
            categories: [],
            category: "None",
            addingCategory: false,
        };
    },
    created() {
        this.getCategories();
    },
    methods: {
        getCategories() {
            axios
                .get("http://localhost:3000/api/category/all")
                .then((response) => {
                    this.categories = response.data.categories.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                })
                .catch((err) => {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: err.response.data.message,
                    });
                });
            this.addingCategory = false;
        },
        addCategory() {
            this.addingCategory = true;
        },
        changeCheckboxAnswer(event, question) {
            if (event.target.checked) {
                question.answers.push(event.target.value);
            } else {
                question.answers = question.answers.filter(
                    (answers) => answers !== event.target.value
                );
            }
            console.log(question.answers);
        },
        addQuestion() {
            this.questions.push({
                question: "",
                type: "text",
                answerOptions: [],
                answers: [],
                points: 0,
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
        setAnswer(event, question) {
            if (question.type === "radio") {
                question.answers = [event.target.value];
            } else if (question.type === "checkbox") {
                if (event.target.checked) {
                    question.answers.push(event.target.value);
                } else {
                    question.answers = question.answers.filter(
                        (answer) => answer !== event.target.value
                    );
                }
            }
            console.log(question.answers);
        },
        async createForm() {
            if (this.name == "") {
                this.$notify({
                    type: "error",
                    text: "Please enter a name for the form",
                });
                return;
            }
            if (this.description == "") {
                this.$notify({
                    type: "error",
                    title: "Error",
                    text: "Please enter a description for the form",
                });
                return;
            }
            if (this.questions.length == 0) {
                this.$notify({
                    type: "error",
                    title: "Error",
                    text: "Please enter at least one question",
                });
                return;
            }
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].question == "") {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: "Please enter a question for question " + (i + 1),
                    });
                    return;
                }
                if (
                    this.questions[i].type === "radio" ||
                    this.questions[i].type === "checkbox"
                ) {
                    if (this.questions[i].answerOptions.length === 0) {
                        this.$notify({
                            type: "error",
                            title: "Error",
                            text:
                                "Please enter at least one answer option for question " +
                                (i + 1),
                        });
                        return;
                    }
                    for (let j = 0; j < this.questions[i].answerOptions.length; j++) {
                        if (this.questions[i].answerOptions[j] === "") {
                            this.$notify({
                                type: "error",
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
                formType: this.formType,
            });
            await axios
                .post("http://localhost:3000/api/form/create", {
                    name: this.name,
                    description: this.description,
                    questions: this.questions,
                    formType: this.formType,
                })
                .then(() => {
                    this.$notify({
                        type: "success",
                        title: "Success",
                        text: "Form created successfully",
                    });
                    this.$router.push("/dashboard");
                })
                .catch((err) => {
                    this.$notify({
                        type: "error",
                        title: "Error",
                        text: err.response.data.message,
                    });
                });
        },
    },
};
</script>

<style scoped>
.form-check-input[type="checkbox"],
.form-check-input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    outline: 1px solid #ccc;
}
</style>