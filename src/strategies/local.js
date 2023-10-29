import { getUser } from "../services/auth.service.js";
import { verifyPassword } from "../utils/passwords.js";
import { Strategy as LocalStrategy } from "passport-local";

export const setLocalStrategy = (model, passport) => {
   return passport.use(
      new LocalStrategy(
         {
            usernameField: "email",
            passportField: "password",
         },
         async (email, password, done) => {
            try {
               const user = await getUser(model, email);

               if (!user) {
                  return done(null, false, { message: "User does not exist" });
               }

               const matchingPass = await verifyPassword(password, user.password);

               if (!matchingPass) {
                  return done(null, false, { message: "Password does not match" });
               }

               delete user.password;

               return done(null, user);
            } catch (err) {
               return done(err);
            }
         }
      )
   );
};
