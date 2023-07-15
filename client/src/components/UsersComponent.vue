<template>
    <h1>Users</h1>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
        </li>
    </ul>
</template>

<script>
// write the code to render the users
export default {
    props: {
        users: {
            type: Array,
            required: true,
        },
    }, 
}
</script>