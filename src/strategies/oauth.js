import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { sign } from "../services/auth.service.js";

export const setFacebookStrategy = (model, passport, fbID, fbSecret) => {
   return passport.use(
      new FacebookStrategy(
         {
            clientID: fbID,
            clientSecret: fbSecret,
            callbackURL: `/api/auth/oauth/facebook/callback`,
            profileFields: ["email"],
         },
         async (accessToken, refreshToken, profile, cb) => {
            const userData = profile._json;

            const user = await sign(model, { email: userData.email, service: "facebook" });

            cb(null, user);
         }
      )
   );
};

export const setGitHubStrategy = (model, passport, ghID, ghSecret) => {
   return passport.use(
      new GithubStrategy(
         {
            clientID: ghID,
            clientSecret: ghSecret,
            callbackURL: "/api/auth/oauth/github/callback",
            scope: "user:email",
         },
         async (accessToken, refreshToken, profile, done) => {
            const user = await sign(model, { email: profile.emails[0].value, service: "github" });

            done(null, user);
         }
      )
   );
};

export const setGoogleStrategy = (model, passport, goID, goSecret) => {
   return passport.use(
      new GoogleStrategy(
         {
            clientID: goID,
            clientSecret: goSecret,
            callbackURL: "/api/auth/oauth/google/callback",
            scope: ["profile", "email"],
         },
         async (accessToken, refreshToken, profile, cb) => {
            const userData = profile._json;

            const user = await sign(model, { email: userData.email, service: "google" });

            cb(null, user);
         }
      )
   );
};

export const setMicrosoftStrategy = (model, passport, msID, msSecret) => {
   return passport.use(
      new MicrosoftStrategy(
         {
            clientID: msID,
            clientSecret: msSecret,
            callbackURL: "/api/auth/oauth/microsoft/callback",
            scope: ["user.read"],
            tenant: "common",
            authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
         },
         async (accessToken, refreshToken, profile, done) => {
            const userData = profile._json;

            const user = await sign(model, { email: userData.mail, service: "microsoft" });

            done(null, user);
         }
      )
   );
};

export const setTwitterStrategy = (model, passport, twID, twSecret) => {
   return passport.use(
      new TwitterStrategy(
         {
            consumerKey: twID,
            consumerSecret: twSecret,
            callbackURL: "/api/auth/oauth/twitter/callback",
            userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
         },
         async (token, tokenSecret, profile, cb) => {
            const user = await sign(model, { email: profile.emails[0].value, service: "twitter" });

            cb(null, user);
         }
      )
   );
};
