<template>
    <div class="container mt-4">
      <h1>{{ form.name }}</h1>
      <p>{{ form.description }}</p>
      <h2>Survey Questions</h2>
      <ul>
        <li v-for="(question, index) in questions" :key="question._id">
          <h3>{{ index + 1 }}. {{ question.question }}</h3>
          <h4>Required: {{ question.required ? 'Yes' : 'No' }}</h4>
          <h4>Answer Statistics:</h4>
          <ul>
            <li v-for="(answerStat, statIndex) in question.answerStats" :key="statIndex">
              {{ answerStat.answer }}: {{ answerStat.count }} responses
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formId: "",
        form: {},
        questions: [],
        isFetching: true,
      };
    },
    created() {
      this.formId = window.location.href.split("/").pop();
      this.fetchFormStats();
    },
    methods: {
      async fetchFormStats() {
        const response = await axios.get(
          "http://localhost:3000/api/form/getFormStats/" + this.formId,
          {}
        );
        this.form = response.data.form;
        this.questions = response.data.questions;
        this.users = response.data.users;
        this.isFetching = false;
        console.log(response.data);
      },
    },
  };
  </script>
  