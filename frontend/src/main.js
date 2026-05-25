import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import authStore from "./auth/authStore";
import router from "./router";
import { initializeMsal, getMsalInstance } from "./auth/msalConfig";

async function bootstrap() {
  await initializeMsal();
  const app = createApp(App);

  app.use(router);

  app.provide("auth", authStore);
  app.provide("msal", getMsalInstance());

  app.mount("#app");
}

bootstrap();