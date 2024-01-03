import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./src/server/db/index";

const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "drizzle" });
        console.log("Migration complete");
    } catch (error) {
        console.log(error);
    }
    process.exit(0);
};
main();
