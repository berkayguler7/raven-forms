<template>
	<div class="main">
		<p>dashboard</p>
	</div>
	<users-component :users="users" />
	<button @click="getUsers">Get Users</button>
</template>

<script>
import axios from "axios";
import UsersComponent from "./UsersComponent.vue";
export default {
	name: "DashBoard",
	components: {
		UsersComponent: UsersComponent,
	},
	data() {
		return {
			users: [],
		};
	},
	methods: {
		getUsers() {
			axios
				.get("api/user/all")
				.then((response) => {
					this.users = response.data.users;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
