import bcrypt from "bcryptjs";

export async function hashString(string) {
  try {
    return bcrypt.hashSync(string, 10);
  } catch (error) {
    console.error(error);
  }
}
