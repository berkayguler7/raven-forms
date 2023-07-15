<template>
	<header>
		<nav>
			<ul>
				<li>
					<router-link style="text-align: right;" v-if="isLoggedIn()" to="/dashboard">Dashboard</router-link>
				</li>
				<li>
					<a v-if="isLoggedIn()" @click="logOut">Log Out</a>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
import axios from "axios";
export default {
	name: "NavigationBar",
	methods: {
		isLoggedIn() {
			console.log("Navbar ss loggedIn: " + sessionStorage.getItem("loggedIn"));
			return sessionStorage.getItem("loggedIn") && 1;
		},
		async logOut() {
			const response = await axios.post("api/user/logout");

			console.log(response);
			this.$notify({
				text: response.data.message,
				type: response.data.type,
			});

			sessionStorage.clear();

			this.$router.push("/login");
		},
	},
};
</script>

<style scoped>
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
</style>
