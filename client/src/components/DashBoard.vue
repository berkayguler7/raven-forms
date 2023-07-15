<template>
	<navigation-bar />

	<div class="main">
		<p>dashboard</p>
	</div>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.username }}
        </li>
    </ul>
    <button @click="getUsers">Get Users</button>

</template>

<script>
import axios from "axios";
export default {
	name: "DashBoard",
    data() {
        return {
            users: [],
            session: localStorage.getItem("sessionToken"),
        };
    },
	mounted() {
		if (!sessionStorage.getItem("loggedIn")) {
			this.$router.push("/login");
		}
	},
    methods: {
        getUsers() {
            console.log(this.users);
            axios.get("api/user/all", {
                    headers: {
                        Authorization: `Bearer ${this.session}`,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    this.users = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
