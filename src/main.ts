import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import useRouterHook from './router';
import useStoreHook from './store';

// 引入tailwind
import './css/tailwind.css';

const app = createApp(App);

useRouterHook(app);
useStoreHook(app);

app.mount('#app');
