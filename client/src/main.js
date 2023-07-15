import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import DashBoard from './components/DashBoard.vue'
import NavigationBar from './components/nav/NavigationBar.vue'
import axios from 'axios'

axios.defaults.withCredentials = true
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/signup', component: SignUp },
        { path: '/login', component: LogIn },
        { path: '/dashboard', component: DashBoard }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
});

const app = createApp(App);

app.use(Notifications);
app.use(router);
app.component('navigation-bar', NavigationBar);

app.mount('#app');
