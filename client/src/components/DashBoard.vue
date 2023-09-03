<template>
	<div class="main">
		<p>Hello, {{ userName }}!</p>
	</div>
	<forms-component :forms="forms" />
	<button @click="getForms">Get Forms</button>
</template>

<script>
import axios from "axios";
import FormsComponent from "./form/FormsComponent.vue";
export default {
	name: "DashBoard",
	components: {
		FormsComponent: FormsComponent,
	},
	data() {
		return {
			forms: [],
			userName: "",
		};
	},
	created() {
		this.userName = localStorage.getItem("user");
	},
	methods: {
		getForms() {
			axios
				.get("api/form/all")
				.then((response) => {
					this.forms = response.data.forms;
					this.$notify({
						text: "Forms fetched successfully",
						type: "success",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
