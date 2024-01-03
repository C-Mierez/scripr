import { db as drizzleDB } from "./index";

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
