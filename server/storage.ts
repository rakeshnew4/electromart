import { type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, products, orders, orderItems } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { desc, asc } from "drizzle-orm";

// Image paths for seeded products
const oceanWaveImage = "/attached_assets/generated_images/Ocean_wave_resin_wall_art_2d8ce367.png";
const purpleCoastersImage = "/attached_assets/generated_images/Purple_gold_resin_coasters_6f9fbce7.png";
const pinkNecklaceImage = "/attached_assets/generated_images/Pink_resin_pendant_necklace_b52777e6.png";
const emeraldTrayImage = "/attached_assets/generated_images/Emerald_green_resin_tray_ec5433b4.png";
const sunsetClockImage = "/attached_assets/generated_images/Sunset_resin_wall_clock_0ce3642c.png";
const pastelEarringsImage = "/attached_assets/generated_images/Pastel_resin_drop_earrings_17ef629d.png";
const tealGeodeImage = "/attached_assets/generated_images/Teal_geode_resin_art_5bc93242.png";
const coralDishImage = "/attached_assets/generated_images/Coral_pink_trinket_dish_90bd3b07.png";
const navyArtImage = "/attached_assets/generated_images/Navy_copper_abstract_art_00e9a345.png";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  
  // Order Items
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  getAllOrders(): Promise<Order[]>;
  
  // Seeding
  seedProducts(): Promise<void>;
}


export class DatabaseStorage implements IStorage {
  async seedProducts(): Promise<void> {
    // Check if products already exist
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) {
      return; // Already seeded
    }
    const initialProducts: Omit<Product, "id">[] = [

      {
        name: "Turquoise Wave Ring Dish",
        description: "Small decorative dish perfect for rings and small jewelry. Features beautiful turquoise and white wave patterns with gold accents. The compact size makes it ideal for bedside tables or bathroom counters. Unique organic shape adds visual interest.",
        price: "999.99",
        category: "home-decor",
        imageUrl: coralDishImage,
        rating: "5.0",
        reviewCount: 167,
        inStock: 18,
        colors: ["Turquoise", "White", "Gold"],
        dimensions: "4\" x 3\" x 0.75\"",
        materials: "Resin, gold flakes",
      },
    ];

    // Insert all products
    await db.insert(products).values(initialProducts as any[]);
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(insertOrder).returning();
    return result[0];
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const result = await db.insert(orderItems).values(insertOrderItem).returning();
    return result[0];
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  async getAllOrders() {
  return db.select().from(orders);
}
}

export const storage = new DatabaseStorage();
