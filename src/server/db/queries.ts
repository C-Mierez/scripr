import { eq } from "drizzle-orm";
import { db as drizzleDB } from "./index";
import { passwordResetToken, users, verificationToken } from "./schema";
import { v4 as uuid } from "uuid";

/* ---------------------------------- Utils --------------------------------- */
/**
 * Fetches the user from the database and checks if the user is verified.
 * @param db Database instance
 * @param id The User ID
 * @returns Whether the user is verified
 */
export const isUserVerified = async (db: typeof drizzleDB, id: string) => {
    const user = await getUserById(db, id);
    return !!(user && user.emailVerified);
};

/* --------------------------------- Queries -------------------------------- */
/**
 * Fetches the user from the database by email.
 * @param db Database instance
 * @param email The user's email
 * @returns The user object or null if the user does not exist
 */
export const getUserByEmail = async (db: typeof drizzleDB, email: string) => {
    try {
        const fetchedUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });

        return fetchedUser;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches the user from the database by ID.
 * @param db Database instance
 * @param id The user's ID
 * @returns The user object or null if the user does not exist
 */
export const getUserById = async (db: typeof drizzleDB, id: string) => {
    try {
        const fetchedUser = await db.query.users.findFirst({
            where: eq(users.id, id),
        });
        return fetchedUser;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches the verificationToken associated to an email.
 * @param db Database instance
 * @param email The user's email
 * @returns The verificationToken object or null if the token does not exist
 */
export const getVerificationTokenByEmail = async (db: typeof drizzleDB, email: string) => {
    try {
        const fetchedToken = await db.query.verificationToken.findFirst({
            where: eq(verificationToken.email, email),
        });

        return fetchedToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches the verificationToken associated to a token.
 * @param db Database instance
 * @param token The token
 * @returns The verificationToken object or null if the token does not exist
 */
export const getVerificationTokenByToken = async (db: typeof drizzleDB, token: string) => {
    try {
        const fetchedToken = await db.query.verificationToken.findFirst({
            where: eq(verificationToken.token, token),
        });
        return fetchedToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches the passwordResetToken associated to a token.
 * @param db Database instance
 * @param token The token
 * @returns The passwordResetToken object or null if the token does not exist
 */
export const getPasswordResetTokenByToken = async (db: typeof drizzleDB, token: string) => {
    try {
        const fetchedToken = await db.query.passwordResetToken.findFirst({
            where: eq(passwordResetToken.token, token),
        });
        return fetchedToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};
/* ------------------------------- Procedures ------------------------------- */
/**
 * Inserts a new user into the database.
 * Generates a UUID for the new user.
 * @param db Database instance
 * @param userData The user creation data, consisting of email, passwordHash, passwordSalt, and name
 */
export const createUser = async (
    db: typeof drizzleDB,
    {
        email,
        passwordHash,
        passwordSalt,
        name,
    }: { email: string; passwordHash: string; passwordSalt: string; name: string }
) => {
    await db.insert(users).values({
        id: uuid(),
        email,
        passwordHash,
        passwordSalt,
        name,
    });
};
/**
 * Updates a user's password.
 * @param db Database instance
 * @param id The user's ID
 * @param passwordHash The new password hash
 * @param passwordSalt The new password salt
 */
export const updateUserPasswordById = async (
    db: typeof drizzleDB,
    { id, passwordHash, passwordSalt }: { id: string; passwordHash: string; passwordSalt: string }
) => {
    await db
        .update(users)
        .set({
            passwordHash,
            passwordSalt,
        })
        .where(eq(users.id, id));
};

/**
 * Verifies a user by ID.
 * Sets the emailVerified field to the current date.
 * @param db Database instance
 * @param id The user's ID
 */
export const verifyUser = async (db: typeof drizzleDB, { id, newEmail }: { id: string; newEmail?: string }) => {
    await db
        .update(users)
        .set({
            emailVerified: new Date(),
            ...(newEmail ? { email: newEmail } : {}),
        })
        .where(eq(users.id, id));
};

/**
 * Deletes a verification token by ID.
 * @param db Database instance
 * @param id The token's ID
 */
export const deleteVerificationTokenById = async (db: typeof drizzleDB, id: string) => {
    await db.delete(verificationToken).where(eq(verificationToken.id, id));
};

/**
 * Deletes a password reset token by ID.
 * @param db Database instance
 * @param id The token's ID
 */
export const deletePasswordResetTokenById = async (db: typeof drizzleDB, id: string) => {
    await db.delete(passwordResetToken).where(eq(passwordResetToken.id, id));
};

/**
 * Creates a new verification token for an email.
 * Relies on PostgresDB generating a UUID for the new token automatically.
 * Sets the new token expiration date to 1 hour from now.
 * Removes any currently existing tokens associated to the email.
 * @param db Database instance
 * @param email The user's email
 * @returns The new verificationToken
 */
export const createVerificationTokenForEmail = async (db: typeof drizzleDB, { email }: { email: string }) => {
    // Calculate token expiration date
    // Milliseconds
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    // Remove all existing tokens associated to the email
    // The DB should only have 1 token per email anyway, but we do this just in case
    await db.delete(verificationToken).where(eq(verificationToken.email, email));

    // Create new token UUID
    const newToken = uuid();

    // Insert new token row
    const newVerificationToken = await db
        .insert(verificationToken)
        .values({
            email,
            expiresAt: expires,
            token: newToken,
        })
        .returning();

    return newVerificationToken[0]!;
};

/**
 * Creates a new password reset token for an email.
 * Relies on PostgresDB generating a UUID for the new token automatically.
 * Sets the new token expiration date to 1 hour from now.
 * Removes any currently existing tokens associated to the email.
 * @param db Database instance
 * @param email The user's email
 * @returns The new passwordResetToken
 */
export const createPasswordResetTokenForEmail = async (db: typeof drizzleDB, { email }: { email: string }) => {
    // Calculate token expiration date
    // Milliseconds
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    // Remove all existing tokens associated to the email
    // The DB should only have 1 token per email anyway, but we do this just in case
    await db.delete(passwordResetToken).where(eq(passwordResetToken.email, email));

    // Create new token UUID
    const newToken = uuid();

    // Insert new token row
    const newPasswordResetToken = await db
        .insert(passwordResetToken)
        .values({
            email,
            expiresAt: expires,
            token: newToken,
        })
        .returning();

    return newPasswordResetToken[0]!;
};
