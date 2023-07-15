<template>
	<h3>Signup</h3>

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
			v-model="name"
			type="text"
			name="name"
			placeholder="Enter name"
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
		<input
			class="input"
			v-model="password_confirmation"
			type="password"
			name="password_confirmation"
			placeholder="Confirm password"
		/>
		<br />
		<button class="submit-button" @click="adduser">Add user</button>
	</form>
	<notifications />
</template>

<script>
import axios from "axios";
export default {
	mounted() {
		if (localStorage.getItem("token") !== null) {
			this.$router.push("/dashboard");
		}
	},
	name: "SignUp",
	data() {
		return {
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
		};
	},
	methods: {
		async adduser(e) {
			e.preventDefault();
			if (this.name === "") {
				this.$notify({
					text: "Name is required",
					type: "warn",
				});
				return;
			}
			if (this.email === "") {
				this.$notify({
					text: "Email is required",
					type: "warn",
				});
				return;
			}
			if (this.password_confirmation !== this.password) {
				this.$notify({
					text: "Passwords do not match",
					type: "warn",
				});
				return;
			}
			try {
				const response = await axios.post("api/user/signup", {
					email: this.email,
					name: this.name,
					password: this.password,
				});

				console.log(response);
				this.$notify({
					text: response.data.message,
					type: response.data.type,
				});
				this.email = "";
				this.name = "";
				this.password = "";
				this.password_confirmation = "";
				this.$router.push("/login");
			} catch (error) {
				error?.response?.data?.message.forEach((element) => {
					let text = element.split(":")[1];
					let type = error.response.data.type;
					this.$notify({
						text,
						type,
						duration: 10000,
					});
				});
				console.log(error);
			}
		},
	},
};
</script>

<style>
.main {
	margin: auto;
	margin-top: 3rem;
	max-width: 400px;
}

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
