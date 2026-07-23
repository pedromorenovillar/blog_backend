import bcrypt from "bcryptjs";

export async function hashString(string) {
  try {
    return await bcrypt.hash(string, 10);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
