<template>
	<div class="container mt-4">
		<h3>Login</h3>
		<notifications />
		<form class="form">
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input id="email" class="form-control" v-model="email" type="text" name="email" placeholder="Enter Email" />
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input id="password" class="form-control" v-model="password" type="password" name="password"
					placeholder="Enter Password" />
			</div>
			<button class="btn btn-primary" @click="logIn">Login</button>
			<p class="mt-2">
				Don't have an account? <router-link to="/signup">Sign up</router-link>
			</p>
		</form>
		<notifications />
	</div>
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
					type: "error",
					text: "Email is required",
				});
				return;
			}
			if (this.password === "") {
				this.$notify({
					type: "error",
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
					type: "error",
					text: e,
				});
			}
		},
	},
};
</script>
