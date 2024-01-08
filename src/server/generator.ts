import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import crypto from "crypto";

/* ---------------------------------- Users --------------------------------- */
/**
 * Generate a new user UUID
 * @returns The generated user UUID
 */
export const generateUserUUID = async () => {
    return uuid();
};

/* -------------------------------- Password -------------------------------- */
/**
 * Generate a new password hash and salt
 * @param passwordPlaintext The password to hash
 * @returns The hashed password and salt
 */
export const hashNewPassword = async (passwordPlaintext: string) => {
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordPlaintext, generatedSalt);

    return {
        hashedPassword,
        generatedSalt,
    };
};

/* --------------------------------- Tokens --------------------------------- */
/**
 * Generate a new random token UUID
 * @returns The generated token UUID
 */
export const generateTokenUUID = async () => {
    return uuid();
};

/**
 * Generate a new random numeric token code
 * @returns The generated token code
 */
export const generateTokenCode = async () => {
    const token = crypto.randomInt(100_000, 999_999).toString();
    return token;
};

/**
 * Generate a new expiration date
 * Currently sets the expiration date to 1 hour from now
 * @returns The generated expiration date
 */
export const generateExpirationDate = async () => {
    return new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now
};
