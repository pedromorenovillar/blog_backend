import bcrypt from "bcryptjs";

export async function genPassword(password) {
  try {
    return bcrypt.hashSync(password, 10);
  } catch (error) {
    console.error(error);
  }
}
