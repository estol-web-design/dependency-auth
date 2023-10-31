# estol-auth

This module provides authorization and authentication functionalities for a Node.js application. It includes local authentication and valious OAuth strategies (Facebook, GitHub, Google, Microsoft, Twitter). The module uses bcrypt for password and provides utility functions for password verification and hashing.

## Instalation

```
$ npm install git+https://github.com/estol-web-design/dependency-auth.git
```

## Usage

### User model

You must define the user model that meets all your requirements for the app you are developing. This dependency only requires that this model contains three fields: first one named 'email' that should have 'required' and 'unique' properties, a second one named 'password', and a third one named 'service' that should have a 'required' property.

```javascript
const userSchema = new Schema({
   email: { type: String, unique: true, required: true },
   password: { type: String },
   service: { type: String, required: true },
});
```

### Importing the module in your auth managment file

Import in your auth managment file the auth strategies that you need this way

```javascript
import strategies from "estol-auth";

// here you can define constants for the strategies you need
const { local, facebook, github, google, microsoft, twitter } = strategies;
```

To implement this strategies in your project you will need to install passport in your project.

#### Example

```javascript
import passport from "passport";
import strategies from "estol-auth";

import User from "your-user-model";

const { local, facebook, github, google, microsoft, twitter } = strategies;

// for local strategy auth with email & password
local(User, passport);

// for oauth strategies
facebook(User, passport, "your FB app id", "your FB app secret");
google(User, passport, "your GOOGLE app id", "your GOOGLE app secret");
// ... for any oauth strategy you need provide de same parameters (User model, passport, and oAuth service credentials)

// this functions will add the strategies to you local passport dependency and you need to export it after selecting your strategies
export default passport;
```

### Importing the module in your auth routes file

Import in your auth routes file the middlewares and controller functions this way

```javascript
import { controller, middlewares } from "estol-auth";

// here you can define constants for signIn & isAuthenticated middleware, and the user role's middlewares that you need
const { signIn, isAuthenticated, isModerator, isAdmin, isSuperAdmin } = middlewares;

// here you can define constants for controller functions
const { getOAuthUser, oauthService, signOut, signUp, updateUser } = controller;
```

#### Example

```javascript
import express from "express";
import { controller, middlewares } from "estol-auth";
import User from "your-user-model";
// import passport from your auth managment file with the strategies that you will be implementing in your app
import passport from "your-auth-management-file";

const { signInMiddleware, isAuthenticated, isModerator, isAdmin, isSuperAdmin } = middlewares;
const { getOAuthUser, oauthService, signOut, signUp, updateUser } = controller;

const router = express.Router();

// local routes
router.post("/local/sign-up", (req, res, next) => signUp(User, req, res, next));
router.post("/local/sign-in", signInMiddleware(passport), (req, res) => signIn(req, res));

// oauth routes
router.get("/oauth/success", isAuthenticated, getOauthUser);
router.get("/oauth/failure", (req, res) => res.redirect("your-failure-url"));
router.get("/oauth/get-user", isAuthenticated, getOAuthUser);
router.get("/oauth/:oauthService", (req, res, next) => passport.authenticate(req.params.oauthService)(req, res, next));
router.get("/oauth/:oauthService/callback", (req, res, next) => {
   passport.authenticate(req.params.oauthService, { failureRedirect: "/oauth/failure", successRedirect: "/oauth/success" });
});

// sign out function
router.get("/sign-out", isAuthenticated, signOut);
```

## IMPORTANT

You need to remmember to import and initialize passport from your auth management file in your index app file this way:

```javascript
import passport from "your-auth-management-file";

app.use(passport.initialize());
app.use(passport.session());
```

# Thanks for using this dependency
