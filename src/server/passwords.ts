import bcrypt from "bcryptjs";

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
