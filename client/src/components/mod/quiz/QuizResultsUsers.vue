<template>
  <div>
    <h1>{{ form.name }}</h1>
    <h2 v-if="!showUser">Users</h2>

    <!-- Display the list of users as a table -->
    <table v-if="!showUser && !isFetching" class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ getUserScore(user) }}</td>
          <td>
            <button @click="showUserDetails(user)" class="btn btn-primary">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Display the user component -->
    <div v-if="showUser">
      <button @click="showUser = false; showUsers = true;" class="btn btn-secondary">Back to User List</button>
      <quiz-results-user :quizId="quizId" :user="selectedUser" :form="form" />
    </div>
  </div>
</template>

<script>
import QuizResultsUser from './QuizResultsUser.vue'; // Import the user component here
import axios from "axios";

export default {
  components: {
    QuizResultsUser,
  },
  data() {
    return {
      showUsers: true, // Indicates whether to show the list of users
      showUser: false,  // Indicates whether to show the user component
      selectedUser: null, // The selected user to display
      users: [],
      form: {},
      quizId: "",
      isFetching: true,
    };
  },
  created() {
    this.quizId = window.location.href.split("/").pop();
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get("http://localhost:3000/api/user/getUsersByQuiz/" + this.quizId, {})
        .then((response) => {
          this.users = response.data.users;
          this.form = response.data.form;
          console.log(this.form);
          console.log(response.data);
          this.$notify({
            text: response.data.text,
            type: response.data.type,
          });
          this.isFetching = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showUserDetails(user) {
      this.selectedUser = user;
      this.showUser = true;
      this.showUsers = false;
    },
    getUserScore(user) {
      if (user.userAnswers) {
        return `${user.userAnswers.score} / ${this.form.totalPoints}`;
      }
      return "N/A";
    },
  },
};
</script>
