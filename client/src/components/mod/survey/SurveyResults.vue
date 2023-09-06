<template>
    <div v-if="!isFetching">
        <div v-for="(survey, i) in surveys" :key="i">
            <h3>{{ survey.name }}</h3>
            <router-link :to="'/mod/surveyResult/' + survey._id" class="btn btn-primary btn-sm">
                View Results
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            surveys: [],
            isFetching: true,
        };
    },
    created() {
        this.fetchSelfSurveys();
    },
    methods: {
        async fetchSelfSurveys() {
            const response = await axios.get(
                "http://localhost:3000/api/user/getSelfSurveys",
                {}
            );
            this.surveys = response.data.surveys;
            this.isFetching = false;
            console.log(response.data);
        },
    }
}
</script>