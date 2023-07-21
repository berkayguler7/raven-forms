<template>
	<navigation-bar />

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
            console.log(this.users);
            axios.get("api/user/all",)
                .then((response) => {
                    console.log(response.data);
                    this.users = response.data.users;
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
};
</script>
