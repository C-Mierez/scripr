import { env } from "~/env.mjs";
import { neon, Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

// const sql = neon(env.DATABASE_URL!);
const sql = new Pool({
    connectionString: env.DATABASE_URL!,
});
export const db = drizzle(sql, { schema: schema });
