import { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

export default (app: App) => {
    app.use(router);
};
