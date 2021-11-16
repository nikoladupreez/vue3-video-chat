import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/login.vue';
import Chat from '@/views/chat.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/chat',
        name: 'Chat',
        component: Chat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
