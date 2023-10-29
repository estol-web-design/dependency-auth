import { setLocalStrategy } from "./strategies/local.js";
import * as controller from "./controllers/authController.js";
import * as middlewares from "./middlewares/auth.middleware.js";
import { setFacebookStrategy, setGitHubStrategy, setGoogleStrategy, setMicrosoftStrategy, setTwitterStrategy } from "./strategies/oauth.js";

const passportAuth = {
   controller,
   middlewares,
   strategies: {
      local: setLocalStrategy,
      facebook: setFacebookStrategy,
      github: setGitHubStrategy,
      google: setGoogleStrategy,
      microsoft: setMicrosoftStrategy,
      twitter: setTwitterStrategy,
   },
};

export default passportAuth;
