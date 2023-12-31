import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'

import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import DashBoard from './components/DashBoard.vue'
import NavigationBar from './components/nav/NavigationBar.vue'
import FormView from './components/form/FormView.vue'
import CreateForm from './components/form/CreateForm.vue'

axios.defaults.withCredentials = true

import emitter from './mitt'
const app = createApp(App);
window.emitter = emitter;
app.config.globalProperties.$mitt = emitter;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/signup', component: SignUp },
        { path: '/login', component: LogIn },
        { path: '/dashboard', component: DashBoard },
        { path: '/form/create', component: CreateForm },
        { path: '/form/:id', component: FormView },
        { path: '/mod/quizResults/', component: () => import('./components/mod/quiz/QuizResults.vue') },
        { path: '/mod/quizResults/:id', component: () => import('./components/mod/quiz/QuizResultsUsers.vue') },
        { path: '/mod/surveyResults/', component: () => import('./components/mod/survey/SurveyResults.vue') },
        { path: '/mod/surveyResult/:id', component: () => import('./components/mod/survey/SurveyResult.vue') },
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
    axios.get('/api/user/verify').then((response) => {
        if(response.data.userRole === 'admin'){
            next();
        }
        window.emitter.emit('navbar-update', response.data.userRole);

        localStorage.setItem('user', response.data.userName);
        localStorage.setItem('role', response.data.userRole);
        localStorage.setItem('id', response.data.userID);

        if(response.data.userRole !== 'moderator' && to.path === '/form/create'){
            next('/dashboard');
        }

        if (to.path === '/login' || to.path === '/signup') {
            if (response.data.status === 'ok') {
                next('/dashboard');
            } else {
                next();
            }
        } else {
            if (response.data.status === 'ok') {
                next();
            } else {
                next('/login');
            }
        }
    });
});

app.use(Notifications);
app.use(router);

app.component('navigation-bar', NavigationBar);
import FormsComponent from './components/form/FormsComponent.vue'
app.component('forms-component', FormsComponent );
app.component('form-timer', () => import('./components/form/FormTimer.vue'));
import QuestionComponent from './components/form/QuestionComponent.vue'
app.component('question-component', QuestionComponent);
app.component('create-form', CreateForm);
app.component('form-view', FormView);
import CategoryModal from './components/CategoryModal.vue'
app.component('category-modal', CategoryModal);
import QuizResultsUser from './components/mod/quiz/QuizResultsUser.vue'
app.component('quiz-results-user', QuizResultsUser);
import SurveyResult from './components/mod/survey/SurveyResult.vue'
app.component('survey-result', SurveyResult);

app.mount('#app');
