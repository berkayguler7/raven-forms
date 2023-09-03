<template>
	<header>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="show == 'moderator' || show == 'user'">
			<div class="container">
				<router-link class="navbar-brand" to="/dashboard">RavenForms</router-link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link v-if="show == 'moderator'" class="nav-link" to="/form/create">Create Form</router-link>
						</li>
						<li class="nav-item">
							<router-link v-if="show == 'user'" class="nav-link" to="/user/forms">My Forms</router-link>
						</li>
						<li class="nav-item">
							<router-link v-if="show == 'moderator'" class="nav-link" to="/mod/quiz">My Quizzes</router-link>
						</li>
                        <li class="nav-item">
                            <router-link v-if="show == 'moderator'" class="nav-link" to="/mod/survey">My Surveys</router-link>
                        </li>
						<li class="nav-item">
							<a class="nav-link" @click="logout" href="#">Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<a class="nav-link" @click="logout" href="#">SAVE Logout</a>
	</header>
</template>
  

<script>
import axios from "axios";
import emitter from "../../mitt.js";
export default {
	name: "NavigationBar",
	props: {
		show: {
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
		async setShow(role) {
			if (role === "user") {
				this.showUser = true;
			} else if (role === "moderator") {
				this.showModerator = true;
			} else if (role === "admin") {
				this.showUser = true;
				this.showModerator = true;
			}
		}
	},
	created() {
		emitter.on("navbar-update", (userRole) => {
			this.setShow(userRole);
		});
		
	},
};
</script>

<!-- <style scoped>
header {
	width: 100%;
	height: 5rem;
	background-color: #11005c;
}

nav {
	height: 100%;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

li {
	margin: 0 2rem;
}

a {
	font: inherit;
	background: transparent;
	border: 1px solid transparent;
	cursor: pointer;
	color: white;
	padding: 0.5rem 1.5rem;
	display: inline-block;
}

a:hover,
a:active,
a.active {
	color: #f1a80a;
	border-color: #f1a80a;
	background-color: #1a037e;
}
</style> -->
