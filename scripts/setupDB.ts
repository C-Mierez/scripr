import { db } from "../src/server/db/index";
import { roles } from "~/server/db/schema";
import { UserRoleSchema } from "schemas";

const main = async () => {
    try {
        console.log("Inserting roles on table roles...");

        const roleValues = UserRoleSchema.Values;

        await db.insert(roles).values([
            {
                name: roleValues.user,
            },
            {
                name: roleValues.admin,
            },
        ]);
        console.log("Inserted user and admin roles.");
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
};
main();
