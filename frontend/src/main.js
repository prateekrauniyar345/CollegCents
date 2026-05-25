import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import authStore, { setAccount, clearAccount } from "./auth/authStore";
import { msalConfig } from "./auth/msalConfig";
import { PublicClientApplication, EventType } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

async function bootstrap() {
  await msalInstance.initialize();

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
      const account = event.payload?.account || msalInstance.getAllAccounts()[0];

      if (account) {
        msalInstance.setActiveAccount(account);
        setAccount(account);
      }
    } else if (event.eventType === EventType.LOGOUT_SUCCESS) {
      msalInstance.setActiveAccount(null);
      clearAccount();
    }
  });

  const app = createApp(App);
  app.use(router);
  app.provide("auth", authStore);
  app.provide("msal", msalInstance);
  app.mount("#app");
}

bootstrap();