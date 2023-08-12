<template>
	<h1>Forms</h1>
	<ul>
		<li v-for="form in forms" :key="form.id">
			{{ form.name }} - <router-link :to="'/form/' + form._id">View</router-link>
		</li>
	</ul>
</template>

<script>
// write the code to render the forms
export default {
	props: {
		forms: {
			type: Array,
			required: true,
		},
	},
};
</script>
