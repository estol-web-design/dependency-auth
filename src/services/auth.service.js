import { hashPassword } from "../utils/passwords.js";

export const getUser = async (model, email) => {
   const user = await model.findOne({ email }).select("-password");

   return user;
};

export const sign = async (model, data) => {
   try {
      let user;
      if (data.password) {
         user = await model.findOne({email: data.email});
         if (!user) {
            const hash = await hashPassword(data.password);
            user = await model.create({ email: data.email, password: hash, service: "local" });
         } 
      } else {
         user = await getUser(model, data.email);
         if (!user) {
            user = await model.create({ email: data.email, service: data.service });
         }
      }

   
      return user;
   } catch (error) {
      console.log(error)
      throw new Error(error.message)
   }
};

export const updateUser = async (model, id, field, value) => {
   const user = await model.findByIdAndUpdate(id, { [field]: value }, { new: true });

   return user;
};
