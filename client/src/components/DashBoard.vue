<template>
	<div class="main">
		<p>dashboard</p>
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
		};
	},
	methods: {
		getForms() {
			axios
				.get("api/form/all")
				.then((response) => {
					this.forms = response.data.forms;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
