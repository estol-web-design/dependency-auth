import * as authService from "../services/auth.service.js";

export const signUp = async (model, req, res, next) => {
   try {
      const data = req.body;
      const user = await authService.sign(model, data);
      req.login(user, (err) => {
         if (err) return next(err);
         return res.status(201).json({ success: true, message: "User successfully registered" });
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
   }
};

export const updateUser = async (model, req, res) => {
   try {
      const { id, field } = req.params;
      const { value } = req.body;

      const user = await authService.updateUser(model, id, field, value);

      return res.json({ success: true, user });
   } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
   }
};

export const signIn = (req, res, next) => {
   if (req.user) {
      return res.json({ success: true, user: req.user });
   } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
   }
};

export const signOut = (req, res) => {
   req.logout((err) => {
      if (err) {
         return res.status(500).json({ success: false, message: err.message });
      }

      return res.json({ success: true, message: "User successfuly logged out" });
   });
};

export const oauthService = async (URL, req, res) => {
   try {
      res.redirect(`${URL}/oauth/success`);
   } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
   }
};

export const getOAuthUser = (req, res) => {
   try {
      return res.json({ success: true, user: req.user });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: error.message });
   }
};
