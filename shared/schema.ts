import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Products table
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("5.0"),
  reviewCount: integer("review_count").notNull().default(0),
  inStock: integer("in_stock").notNull().default(1),
  colors: text("colors").array().notNull().default(sql`ARRAY[]::text[]`),
  dimensions: text("dimensions"),
  materials: text("materials"),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Orders table
// export const orders = pgTable("orders", {
//   id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
//   customerName: text("customer_name").notNull(),
//   customerEmail: text("customer_email").notNull(),
//   shippingAddress: text("shipping_address").notNull(),
//   shippingCity: text("shipping_city").notNull(),
//   shippingState: text("shipping_state").notNull(),
//   shippingZip: text("shipping_zip").notNull(),
//   totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
//   status: text("status").notNull().default("pending"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerInfo: jsonb("customer_info").notNull(),
  shippingAddress: jsonb("shipping_address").notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});



export const insertOrderSchema = createInsertSchema(orders).extend({
  customerInfo: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(), // <-- add phone
  }),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  totalAmount: z.number(), // backend expects number
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull(),
  productId: varchar("product_id").notNull(),
  productName: text("product_name").notNull(),
  productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Cart item type (client-side only, no DB table)
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Review type (for display purposes)
export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
