<template>
  <div class="container mt-4">
    <div class="mb-4">
      <h2>User Results</h2>
      <p>User: {{ user.name }} (ID: {{ user.id }})</p>
      <p>Email: {{ user.email }}</p>
      <p>Score: {{ user.userAnswers.score }}</p>
    </div>
    <div v-if="form.questions && form.questions.length > 0">
      <h3>Quiz Questions</h3>
      <br />
      <form>
        <div v-for="(question, index) in form.questions" :key="index" class="mb-4 form-group">
          <h4>{{ index + 1 }}. {{ question.question }}</h4>
          <div v-if="question.type === 'text'">
            <div class="form-inline d-flex align-items-end">
              <textarea :value="getTextQuestionAnswer(question._id)" class="form-control" :disabled="true" ref="textarea"></textarea>
              <input id="points" class="form-control" type="number" @change="handlePointsChange($event, question, user)"
                :min="0" :max="question.points" style="width: 100px; margin-top: 10px;" value="0" />
            </div>
          </div>
          <div v-else>
            <div v-for="(option, i) in question.answerOptions" :key="i" class="answer-option">
              <div :class="isCorrectOption(question, option)" class="answer-rectangle">
                <p style="text-align: left; margin-left: 20px; margin-top: 10px">
                  {{ option }}
                </p>
              </div>
            </div>
          </div>
          <p v-if="question.type != 'text'">
            Correct Answer<span v-if="question.type === 'checkbox'">s</span>:
            {{ question.answers.join(", ") }}
          </p>
          <p>
            Points:
            {{
              user.userAnswers.questionAnswers.find(
                (qa) => qa.question == question._id
              ).points
            }}
            / {{ question.points }}
          </p>
        </div>
        <button @click="updateQuizResults" class="btn btn-primary">
          Update Quiz Results
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["quizId", "user", "form"],
  data() {
    return {
      textQuestionAnswer: [],
    };
  },
  created() {
    console.log("this.user: ", this.user);
    console.log(this.user.userAnswers.questionAnswers);
    for (let question in this.form.questions.filter((q) => q.type === "text")) {
      this.textQuestionAnswer.push({
        question: question.question,
        answer: this.user.userAnswers.questionAnswers.find(
          (qa) => qa.question == question._id
        ),
      });
    }
  },
  mounted() {
    // resize textarea
    this.$nextTick(() => {
      this.$refs.textarea.forEach((textarea) => {
        textarea.style.height = textarea.scrollHeight + 2 + 'px';
      });
    });
  },
  methods: {
    isCorrectOption(question, option) {
      if (question.answers.includes(option)) {
        return "answer-correct";
      }
      if (
        this.user.userAnswers.questionAnswers
          .find((qa) => qa.question == question._id)
          .answers.includes(option)
      ) {
        return "answer-incorrect";
      }
      return "";
    },
    getTextQuestionAnswer(questionId) {
      const questionAnswer = this.user.userAnswers.questionAnswers.find(
        (answer) => answer.question === questionId
      );
      if (questionAnswer) {
        return questionAnswer.answers[0];
      }
      return "";
    },
    handlePointsChange(e, question, user) {
      if (e.target.value > question.points) {
        e.target.value = question.points;
      }
      user.userAnswers.questionAnswers.find(
        (qa) => qa.question == question._id
      ).points = parseInt(e.target.value);
      user.userAnswers.score = user.userAnswers.questionAnswers.reduce(
        (acc, qa) => acc + qa.points,
        0
      );
    },
    async updateQuizResults(e) {
      e.preventDefault();

      await axios.put(`http://localhost:3000/api/user/updateQuizResults/`, {
        userAnswers: this.user.userAnswers,
        quizId: this.quizId,
        userId: this.user.id,
      });
    },
  },
};
</script>

<style scoped>
.answer-option {
  align-items: center;
  margin-bottom: 5px;
}

.answer-rectangle {
  display: inline-block;
  border: 3px solid #ccc;
  margin-right: 5px;
  border-radius: 8px;
  width: 350px;
}

.answer-correct {
  border-color: green;
  color: black;
}

.answer-incorrect {
  border-color: red;
  color: black;
}
</style>
