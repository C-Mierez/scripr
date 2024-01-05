// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    pgTableCreator,
    bigserial,
    index,
    timestamp,
    varchar,
    uuid,
    text,
    integer,
    primaryKey,
    pgEnum,
    serial,
    unique,
    boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `scripr_${name}`);

/* ------------------------------ Example Table ----------------------------- */
export const posts = pgTable(
    "post",
    {
        id: bigserial("id", { mode: "number" }).primaryKey(),
        name: varchar("name", { length: 256 }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        nameIndex: index("name_idx").on(table.name),
    })
);

/* --------------------------------- Auth.js -------------------------------- */
export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    // Credentials
    passwordHash: text("passwordHash"),
    passwordSalt: text("passwordSalt"),
    // Roles
    roleId: integer("roleId")
        .notNull()
        .default(1)
        .references(() => roles.id),
    // Two Factor
    isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const roles = pgTable(
    "role",
    {
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
    },
    (role) => ({
        roleNameIndex: index("role_name_idx").on(role.name),
    })
);

export const verificationToken = pgTable(
    "verification_token",
    {
        id: uuid("id").notNull().defaultRandom().primaryKey(),
        token: text("token").notNull().unique(),
        email: text("email").notNull(),
        expiresAt: timestamp("expiresAt").notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (table) => ({
        uniqueTokens: unique().on(table.token, table.email),
    })
);

export const passwordResetToken = pgTable(
    "password_reset_token",
    {
        id: uuid("id").notNull().defaultRandom().primaryKey(),
        token: text("token").notNull().unique(),
        email: text("email").notNull(),
        expiresAt: timestamp("expiresAt").notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (table) => ({
        uniqueTokens: unique().on(table.token, table.email),
    })
);

export const twoFactorToken = pgTable("two_factor_token", {
    id: uuid("id").notNull().defaultRandom().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    isConfirmed: boolean("isConfirmed").notNull().default(false),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
