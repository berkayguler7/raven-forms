<template>
	<div class="container mt-4">
		<h1 class="mb-4">Forms</h1>
		<ul class="list-group">
			<li v-for="form in forms" :key="form.id"
				class="list-group-item d-flex justify-content-between align-items-center">
				{{ form.name }}
				<router-link :to="'/form/' + form._id" class="btn btn-primary">View</router-link>
			</li>
		</ul>
	</div>
</template>
  
<script>
export default {
	props: {
		forms: {
			type: Array,
			required: true,
		},
	},
};
</script>
