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

router.beforeEach((to, from, next) => {
    axios.get('/api/user/verify').then((response) => {
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

const app = createApp(App);

app.use(Notifications);
app.use(router);
app.component('navigation-bar', NavigationBar);
import UsersComponent from './components/UsersComponent.vue'
app.component('users-component', UsersComponent);
import FormComponent from './components/FormComponent.vue'
app.component('form-component', FormComponent);

app.mount('#app');
