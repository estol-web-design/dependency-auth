import passport from "passport";

export const isAuthenticated = (req, res, next) => {
   if (req.isAuthenticated()) {
      return next();
   }
   res.status(401).json({ success: false, message: "Unauthorized" });
};

export const singIn = passport.authenticate("local", {
   session: true,
});

export const isSuperAdmin = (req, res, next) => {
   if (req.isAuthenticated() && req.user.role === "superadmin") {
      return next();
   }
   return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const isAdmin = (req, res, next) => {
   if ((req.isAuthenticated() && req.user.role === "admin") || req.user.role === "superadmin") {
      return next();
   }
   return res.status(401).json({ success: false, message: "Unauthorized" });
};

export const isModerator = (req, res, next) => {
   if ((req.isAuthenticated() && req.user.role === "moderator") || req.user.role === "admin" || req.user.role === "superadmin") {
      return next();
   }
   return res.status(401).json({ success: false, message: "Unauthorized" });
};
