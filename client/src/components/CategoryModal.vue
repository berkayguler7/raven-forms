<template>
    <div class="container mt-4">
      <h3>Create Category</h3>
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Category Name</label>
          <input type="text" class="form-control" v-model="name" id="name" placeholder="Enter Category Name" />
        </div>
        <button class="btn btn-primary" @click="createCategory">Submit</button>
      </form>
    </div>
  </template>
  

<script>
import axios from "axios";
export default {
    name: "CategoryModal",
    data() {
        return {
            name: "",
        };
    },
    methods: {
        async createCategory(e) {
            e.preventDefault();
            if (this.name === "") {
                this.$notify({
                    text: "Name is required",
                    type: "warn",
                });
                return;
            }
            const response = await axios.post(
                "http://localhost:3000/api/category/create",
                {
                    name: this.name,
                },
            );
            this.$notify({
                text: response.data.message,
                type: response.data.type,
            });
            if (response.data.type === "success") {
                this.$emit("categoryCreated", response.data.category);
            }
        },
    },
};
</script>