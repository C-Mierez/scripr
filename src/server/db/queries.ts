import { eq } from "drizzle-orm";
import { db as drizzleDB } from "./index";
import { users } from "./schema";
import { v4 as uuid } from "uuid";

/* ---------------------------------- Utils --------------------------------- */
export const isUserVerified = async (db: typeof drizzleDB, id: string) => {
    const user = await getUserById(db, id);
    return !!(user && user.emailVerified);
};

/* --------------------------------- Queries -------------------------------- */
export const getUserByEmail = async (db: typeof drizzleDB, email: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserById = async (db: typeof drizzleDB, id: string) => {
    try {
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.id, id),
        });
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/* ------------------------------- Procedures ------------------------------- */
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

export const verifyUser = async (db: typeof drizzleDB, { id }: { id: string }) => {
    await db
        .update(users)
        .set({
            emailVerified: new Date(),
        })
        .where(eq(users.id, id));
};
