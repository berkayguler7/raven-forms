<template>
    <div class="container mt-4">
      <h1>My Quizzes</h1>
      <table class="table table-striped" v-if="!isFetching">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="quiz in quizzes" :key="quiz._id">
            <td>{{ quiz.name }}</td>
            <td>{{ quiz.category.name }}</td>
            <td>
              <router-link :to="'/mod/quizResults/' + quiz._id" class="btn btn-primary btn-sm">
                View Results
              </router-link>
              <router-link :to="'/mod/quiz/' + quiz._id" class="btn btn-primary btn-sm">
                Edit
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            moderatorId: localStorage.getItem('userID'),
            quizzes: [],
            isFetching: true,
        };
    },
    created() {
        this.fetchQuizzes();
    },
    methods: {
        fetchQuizzes() {
            axios.get(`http://localhost:3000/api/form/getQuizzesByAuthor/${this.moderatorId}`)
                .then((response) => {
                    this.quizzes = response.data.forms;
                    console.log(response.data);
                    this.$notify({
                        text: response.data.message,
                        type: response.data.type,
                    });
                    this.isFetching = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
  