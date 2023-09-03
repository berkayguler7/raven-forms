<template>
	<navigation-bar :show="userRole" />

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
		};
	},
};
</script>

<style>
.main {
	margin: auto;
	margin-top: 3rem;
	max-width: 600px;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>

