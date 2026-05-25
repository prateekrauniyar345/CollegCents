import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import authStore, { setAccount, clearAccount } from "./auth/authStore";
import { msalConfig } from "./auth/msalConfig";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import axios from 'axios';

const msalInstance = new PublicClientApplication(msalConfig);

async function bootstrap() {
  await msalInstance.initialize();

  msalInstance.addEventCallback(async (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
      const account = event.payload?.account || msalInstance.getAllAccounts()[0];

      if (account) {
        msalInstance.setActiveAccount(account);
        setAccount(account);

        // Sync user with backend MySQL database
        try {
          await axios.post('http://localhost:5001/api/users/auth', {
            providerUserId: account.localAccountId, // OID from MSAL
            homeAccountId: account.homeAccountId,
            tenantId: account.tenantId,
            email: account.username,
            name: account.name
          });
          console.log('User synced with backend database successfully.');
        } catch (error) {
          console.error('Failed to sync user with backend:', error);
        }
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