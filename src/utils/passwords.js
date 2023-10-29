import bcrypt from "bcryptjs";

export const verifyPassword = async (password, hash) => {
   const matches = await bcrypt.compare(password, hash);

   return matches;
};

export const hashPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPass = await bcrypt.hash(password, salt);

   return hashedPass;
};
