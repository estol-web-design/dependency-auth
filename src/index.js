import { setLocalStrategy } from "./strategies/local.js";
import * as authController from "./controllers/authController.js";
import * as authMiddlewares from "./middlewares/auth.middleware.js";
import { setFacebookStrategy, setGitHubStrategy, setGoogleStrategy, setMicrosoftStrategy, setTwitterStrategy } from "./strategies/oauth.js";

const strategies = {
   local: setLocalStrategy,
   facebook: setFacebookStrategy,
   github: setGitHubStrategy,
   google: setGoogleStrategy,
   microsoft: setMicrosoftStrategy,
   twitter: setTwitterStrategy,
};

export const controller = authController;
export const middlewares = authMiddlewares;

export default strategies;
