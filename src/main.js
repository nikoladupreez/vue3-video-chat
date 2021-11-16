import { createApp } from 'vue'
import app from './app.vue'
import router from './router';
import store from '@/store/index.js';

const application = createApp(app);
application.use(router);
application.use(store);
application.mount('#app');
