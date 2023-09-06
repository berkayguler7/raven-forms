<template>
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="role == 'moderator' || role == 'user'">
			<div class="container">
				<router-link class="navbar-brand" to="/dashboard">RavenForms</router-link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<!-- USER CONTENT -->
					<ul class="navbar-nav" v-if="role == 'user'">
						<li class="nav-item">
							<router-link  class="nav-link" to="/user/forms">My Forms</router-link>
						</li>

						<li class="nav-item">
							<a class="nav-link" @click="logout" href="#">Logout</a>
						</li>
					</ul>

					<!-- MODERATOR CONTENT -->
					<ul class="navbar-nav" v-if="role == 'moderator'">
						<li class="nav-item">
							<router-link class="nav-link" to="/form/create">Create Form</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/mod/quizResults/">My Quizzes</router-link>
						</li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/mod/surveyResults">My Surveys</router-link>
                        </li>
						
						<li class="nav-item">
							<a class="nav-link" @click="logout" href="#">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
</template>
  

<script>
import axios from "axios";
export default {
	name: "NavigationBar",
	data() {
		return {
			userName: "",
		};
	},
	created() {
		this.userName = localStorage.getItem("user");
	},
	props: {
		role: {
			type: String,
			default: "",
		},
	},
	methods: {
		async logout() {
			const response = await axios.post("/api/user/logout");

			console.log(response);
			this.$notify({
				text: response.data.message,
				type: response.data.type,
			});

			this.$router.push("/login");
		},
	},
};
</script>
