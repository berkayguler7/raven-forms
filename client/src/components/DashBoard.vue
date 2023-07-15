<template>
	<navigation-bar />

	<div class="main">
		<p>dashboard</p>
	</div>
</template>

<script>
export default {
	name: "DashBoard",
	mounted() {
		if (localStorage.getItem("token") === null) {
			this.$router.push("/");
		}
	},
};
</script>
