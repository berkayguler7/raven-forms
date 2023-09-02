<template>
	<div class="container mt-4">
		<h3>Signup</h3>
		<br><br>
		<form class="form">
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input class="form-control" v-model="email" type="text" name="email" placeholder="Enter Email" />
			</div>
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input class="form-control" v-model="name" type="text" name="name" placeholder="Enter Name" />
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input class="form-control" v-model="password" type="password" name="password"
					placeholder="Enter Password" />
			</div>
			<div class="mb-3">
				<label for="password_confirmation" class="form-label">Confirm Password</label>
				<input class="form-control" v-model="password_confirmation" type="password" name="password_confirmation"
					placeholder="Confirm Password" />
			</div>
			<button class="btn btn-primary" @click="addUser">Sign Up</button>
			<p class="mt-3">
				Already have an account? <router-link to="/login">Login</router-link>
			</p>
		</form>
		<notifications />
	</div>
</template>

<script>
import axios from "axios";
export default {
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
		async addUser(e) {
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
.form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
