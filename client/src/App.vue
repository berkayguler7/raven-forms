<template>
	<navigation-bar :role="userRole" :key="updateKey" />

	<div class="main">
		<router-view />
	</div>

	<notifications />
</template>

<script>
import NavigationBar from "./components/nav/NavigationBar.vue";
import emitter from "./mitt.js";
export default {
	name: "App",
	components: {
		NavigationBar,
	},
	data() {
		return {
			userRole: "",
			updateKey: 0,
		};
	},
	created() {
		emitter.on("navbar-update", (role) => {
			this.navbarUpdate(role);
		});
	},
	methods: {
		navbarUpdate(role) {
			this.userRole = role;
			console.log(role);
			this.updateKey += 1;
		},
	}
};
</script>

<style>
.main {
	margin: auto;
	margin-top: 3rem;
	max-width: 800px;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>

