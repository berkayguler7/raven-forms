import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import SignUp from './components/SignUp.vue'
import LogIn from './components/LogIn.vue'
import DashBoard from './components/DashBoard.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/signup' },
        { path: '/signup', component: SignUp },
        { path: '/login', component: LogIn },
        { path: '/dashboard', component: DashBoard }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

const app = createApp(App)

app.use(Notifications)
app.use(router)

app.mount('#app');
