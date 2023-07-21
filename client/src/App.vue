<template>
	<navigation-bar v-show="loggedIn" :loggedIn="loggedIn" />

	<div class="main">
		<router-view />
	</div>
</template>

<script>
import NavigationBar from "./components/nav/NavigationBar.vue";
export default {
	data() {
		return {
			loggedIn: false,
		};
	},
	name: "App",
	components: {
		NavigationBar,
	},
	watch: {
		loggedIn() {
			console.log("loggedIn: " + this.loggedIn);
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

