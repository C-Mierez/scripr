import { eq } from "drizzle-orm";
import { db as drizzleDB } from "./index";
import { passwordResetToken, twoFactorToken, users, verificationToken } from "./schema";
import { generateExpirationDate, generateTokenCode, generateTokenUUID, generateUserUUID } from "../generator";

// TODO: Optimize these queries to only SELECT the fields we need
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

/**
 * Fetches the user from the database and checks if the user has two factor enabled.
 * @param db Database instance
 * @param id The User ID
 * @returns Whether the user has two factor enabled
 */
export const isUserTwoFactorEnabled = async (db: typeof drizzleDB, id: string) => {
    const user = await getUserById(db, id);
    return !!(user && user.isTwoFactorEnabled);
};

export const isUserTwoFactorDisabledOrConfirmed = async (db: typeof drizzleDB, id: string) => {
    const user = await getUserById(db, id);

    // If the user doesn't exist, return false
    if (!user) return false;

    // If two factor is disabled, return true
    if (!user?.isTwoFactorEnabled) return true;

    // If two factor is enabled, check if it's confirmed
    const fetchedToken = await db.query.twoFactorToken.findFirst({
        where: eq(twoFactorToken.userId, id),
    });

    // If no token is found, return false
    if (!fetchedToken) return false;

    // If token is found, check if it's expired
    const now = new Date();
    const expiresAt = new Date(fetchedToken.expiresAt);
    if (now > expiresAt) return false;

    // Return whether the token has been confirmed
    return fetchedToken.isConfirmed;
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

/**
 * Fetches the TwoFactorToken associated to an ID.
 * @param db Database instance
 * @param id The token
 * @returns The TwoFactorToken object or null if the token does not exist
 */
export const getTwoFactorTokenByToken = async (db: typeof drizzleDB, token: string) => {
    try {
        const fetchedToken = await db.query.twoFactorToken.findFirst({
            where: eq(twoFactorToken.token, token),
        });
        return fetchedToken;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Fetches the TwoFactorToken associated to a user ID.
 * @param db Database instance
 * @param userId The user ID
 * @returns The TwoFactorToken object or null if the token does not exist
 */
export const getTwoFactorTokenByUserId = async (db: typeof drizzleDB, userId: string) => {
    try {
        const fetchedToken = await db.query.twoFactorToken.findFirst({
            where: eq(twoFactorToken.userId, userId),
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
        id: await generateUserUUID(),
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
 * Updates a user's two factor confirmation status by token ID.
 * @param db Database instance
 * @param id The token's ID
 * @param isConfirmed Whether the token has been confirmed
 */
export const updateTwoFactorTokenConfirmationById = async (
    db: typeof drizzleDB,
    { id, isConfirmed }: { id: string; isConfirmed: boolean }
) => {
    await db
        .update(twoFactorToken)
        .set({
            isConfirmed,
        })
        .where(eq(twoFactorToken.id, id));
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
 * Deletes a two factor token by ID.
 * @param db Database instance
 * @param id The token's ID
 */
export const deleteTwoFactorTokenById = async (db: typeof drizzleDB, id: string) => {
    await db.delete(twoFactorToken).where(eq(twoFactorToken.id, id));
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
    const expires = await generateExpirationDate();

    // Remove all existing tokens associated to the email
    // The DB should only have 1 token per email anyway, but we do this just in case
    await db.delete(verificationToken).where(eq(verificationToken.email, email));

    // Create new token UUID
    const newToken = await generateTokenUUID();

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
    const expires = await generateExpirationDate();

    // Remove all existing tokens associated to the email
    // The DB should only have 1 token per email anyway, but we do this just in case
    await db.delete(passwordResetToken).where(eq(passwordResetToken.email, email));

    // Create new token UUID
    const newToken = await generateTokenUUID();

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

/**
 * Creates a new two factor token.
 * Generates a random number between 100_000 and 999_999 to be used as the token value.
 * Relies on PostgresDB generating a UUID for the new token automatically.
 * Sets the new token expiration date to 1 hour from now.
 * @param db Database instance
 * @param id The user's ID
 * @returns The new twoFactorToken
 */
export const createTwoFactorTokenForUserId = async (db: typeof drizzleDB, { userId }: { userId: string }) => {
    // Calculate token expiration date
    // Milliseconds
    const expires = await generateExpirationDate();

    // Remove all existing tokens associated to the user
    await db.delete(twoFactorToken).where(eq(twoFactorToken.userId, userId));

    // Create new token value
    const newToken = await generateTokenCode();

    // Insert new token row
    const newTwoFactorToken = await db
        .insert(twoFactorToken)
        .values({
            expiresAt: expires,
            token: newToken,
            userId,
        })
        .returning();

    return newTwoFactorToken[0]!;
};
