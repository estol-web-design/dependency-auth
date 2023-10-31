import { getUser, sign } from "../services/auth.service.js";
import { verifyPassword } from "../utils/passwords.js";
import { Strategy as LocalStrategy } from "passport-local";

export const setLocalStrategy = (model, passport) => {
   return passport.use(
      new LocalStrategy(
         {
            usernameField: "email",
            passwordField: "password",
         },
         async (email, password, done) => {
            try {
               const data = {
                  email,
                  password,
                  service: 'local',
               }

               const usr = await sign(model, data);

               if (!usr) {
                  return done(null, false, { message: "User does not exist" });
               }

               const matchingPass = await verifyPassword(password, usr.password);
               
               if (!matchingPass) {
                  return done(null, false, { message: "Password does not match" });
               }

               const user = await getUser(model, email);

               return done(null, user);
            } catch (err) {
               return done(err);
            }
         }
      )
   );
};
