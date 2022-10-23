import argon2 from "argon2";

export class PasswordUtil {
  static async toHash(password: string) {
    try {
      return await argon2.hash(password);
    } catch (err) {
      console.log(err);
    }
  }

  static async compare(storedHash: string, suppliedPassword: string) {
    try {
      return await argon2.verify(storedHash, suppliedPassword);
    } catch (err) {
      console.log(err);
    }
  }
}
