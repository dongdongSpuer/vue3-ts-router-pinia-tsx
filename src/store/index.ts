import { createPinia } from 'pinia';
import { App } from 'vue';

const store = createPinia();

export default (app: App) => {
    app.use(store);
};
