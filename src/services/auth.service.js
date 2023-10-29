import { hashPassword } from "../utils/passwords.js";

export const getUser = async (model, email) => {
   const user = await model.findOne({ email }).select("-password");

   return user;
};

export const sign = async (model, data) => {
   if (data.password) {
      const exists = model.exists({ email: data.email });
      if (!exists) {
         throw new Error("User already exists (400)");
      }
      const hash = await hashPassword(data.password);
      await model.create({ email: data.email, password: hash, service: "local" });
   } else {
      const user = await getUser(model, data.email);
      if (!user) {
         await model.create({ user: data.user, service: data.service });
      }
   }

   const user = await getUser(model, data.email);

   return user;
};

export const updateUser = async (model, id, field, value) => {
   const user = await model.findByIdAndUpdate(id, { [field]: value }, { new: true });

   return user;
};
