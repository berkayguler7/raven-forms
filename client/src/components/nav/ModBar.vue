<template>
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container">
				<router-link class="navbar-brand" to="/dashboard">RavenForms</router-link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link class="nav-link" to="/form/create">Create Form</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/mod/quiz">My Quizzes</router-link>
						</li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/mod/survey">My Surveys</router-link>
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
	name: "ModBar",
	methods: {
		async logout() {
			const response = await axios.post("/api/user/logout");

            this.$forceUpdate();

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