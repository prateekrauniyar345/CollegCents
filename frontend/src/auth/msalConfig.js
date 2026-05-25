import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_AZURE_POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: false,
  },

  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },

  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;

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
      piiLoggingEnabled: false,
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
};

const loginRequest = {
  scopes: ["User.Read"],
};

let msalInstance = null;
let isInitialized = false;
let initializePromise = null;
let interactionInProgress = false;

function getMsalInstance() {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication(msalConfig);
  }

  return msalInstance;
}

async function initializeMsal() {
  const instance = getMsalInstance();

  if (isInitialized) {
    return instance;
  }

  if (!initializePromise) {
    initializePromise = instance.initialize().then(() => {
      isInitialized = true;
      return instance;
    });
  }

  return initializePromise;
}

async function loginWithPopup() {
  if (interactionInProgress) {
    throw new Error("Login is already in progress.");
  }

  interactionInProgress = true;

  try {
    const instance = getMsalInstance();
    const response = await instance.loginPopup(loginRequest);

    if (response?.account) {
      instance.setActiveAccount(response.account);
    }

    return response;
  } finally {
    interactionInProgress = false;
  }
}

export {
  msalConfig,
  getMsalInstance,
  initializeMsal,
  loginRequest,
  loginWithPopup,
};
