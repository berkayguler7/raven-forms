<template>
	<h3>Login</h3>
	<notifications />
	<form class="form">
		<input
			class="input"
			v-model="email"
			type="text"
			name="email"
			placeholder="Enter Email"
		/>
		<br />
		<input
			class="input"
			v-model="password"
			type="password"
			name="password"
			placeholder="Enter password"
		/>
		<br />
		<br />
		<button class="submit-button" @click="logIn">Login</button>
		<p>
			Don't have an account? <router-link to="/signup">Sign up</router-link>
		</p>
	</form>
	<notifications />
</template>

<script>
import axios from "axios";
export default {
	name: "LogIn",
	data() {
		return {
			name: "",
			email: "",
			password: "",
		};
	},
	methods: {
		async logIn(e) {
			e.preventDefault();
			if (this.email === "") {
				this.$notify({
					group: "error",
					title: "Error",
					text: "Email is required",
				});
				return;
			}
			if (this.password === "") {
				this.$notify({
					group: "error",
					title: "Error",
					text: "Password is required",
				});
				return;
			}
			try {
				const res = await axios.post("http://localhost:3000/api/user/login", {
					email: this.email,
					password: this.password,
				});
				console.log(res);
				if (res.status === 200) {
					this.$notify({
						type: res.data.type,
						text: res.data.message,
					});
					this.$router.push("/dashboard");
				}
			} catch (e) {
				this.$notify({
					group: "error",
					title: "Error",
					text: e,
				});
			}
		},
	},
};
</script>

<style>
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

.user-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.user-container ul {
	width: 100%;
	list-style: none;
	padding: 0;
}

.user-container ul li {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #e0e0e0;
}

.user {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	padding: 10px;
	max-width: 250px;
}

.user-name {
	font-size: 18px;
	font-weight: bold;
}

.user-name {
	max-width: 70%;
	font-size: 14px;
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
