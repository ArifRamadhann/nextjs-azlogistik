import { sql } from "drizzle-orm";
import {
  datetime,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const product = mysqlTable("product", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  stock: int().notNull(),
  price: int().notNull(),
  createdAt: datetime("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: datetime("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Product = typeof product.$inferSelect;
