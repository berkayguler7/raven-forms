<template>
	<navigation-bar />

	<div class="main">
		<router-view />
	</div>
</template>

<script>
import NavigationBar from "./components/nav/NavigationBar.vue";
export default {
	name: "App",
	components: {
		NavigationBar,
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

