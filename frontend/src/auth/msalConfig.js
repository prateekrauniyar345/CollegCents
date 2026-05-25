import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_AZURE_POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: true,
  },

  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },

  system: {
    loggerOptions: {
      loggerCallback: (level, message) => {
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};



export { msalConfig, loginRequest };