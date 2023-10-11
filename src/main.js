import { createApp, h } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import '/public/css/style.min.css'

const app = createApp({
  render: () => h(App),
});

app.use(store);
app.use(router);

app.mount("#app");
