import { type Product, type InsertProduct, type Order, type InsertOrder, type OrderItem, type InsertOrderItem, products, orders, orderItems } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
        name: "Ocean Wave Resin Wall Art",
        description: "Stunning ocean-inspired resin wall art featuring deep blue and turquoise swirls with gold leaf accents. Each piece captures the mesmerizing beauty of ocean waves with rich color gradients and white foam texture. Perfect statement piece for modern coastal or contemporary interiors.",
        price: "189.99",
        category: "wall-art",
        imageUrl: oceanWaveImage,
        rating: "4.9",
        reviewCount: 127,
        inStock: 3,
        colors: ["Blue", "Turquoise", "Gold", "White"],
        dimensions: "24\" x 18\" x 1.5\"",
        materials: "Premium epoxy resin, gold leaf, wood panel",
      },
      {
        name: "Luxury Purple & Gold Coaster Set",
        description: "Set of 4 elegant resin coasters with rich purple and gold marble effects. Features a glossy finish that's both beautiful and functional. Each coaster has a unique swirl pattern, making your set truly one-of-a-kind. Includes protective cork backing to prevent surface scratches.",
        price: "49.99",
        category: "coasters",
        imageUrl: purpleCoastersImage,
        rating: "5.0",
        reviewCount: 89,
        inStock: 12,
        colors: ["Purple", "Gold", "White"],
        dimensions: "4\" diameter each",
        materials: "Epoxy resin, gold pigment, cork backing",
      },
      {
        name: "Pink Swirl Resin Pendant Necklace",
        description: "Delicate handcrafted pendant necklace featuring soft pink and white resin swirls with embedded gold flakes. The teardrop shape catches light beautifully, creating an elegant shimmer. Comes with an 18-inch gold-plated chain. Each piece is unique with its own pattern variation.",
        price: "39.99",
        category: "jewelry",
        imageUrl: pinkNecklaceImage,
        rating: "4.8",
        reviewCount: 156,
        inStock: 8,
        colors: ["Pink", "White", "Gold"],
        dimensions: "1.5\" pendant height",
        materials: "Resin, gold flakes, gold-plated chain",
      },
      {
        name: "Emerald Hexagonal Serving Tray",
        description: "Modern geometric resin serving tray in stunning emerald green with gold accents. Perfect for entertaining or as a decorative catch-all tray. The hexagonal shape adds contemporary flair while the high-gloss finish creates depth. Features gold handles for easy carrying.",
        price: "79.99",
        category: "trays",
        imageUrl: emeraldTrayImage,
        rating: "4.9",
        reviewCount: 73,
        inStock: 5,
        colors: ["Emerald Green", "Gold"],
        dimensions: "14\" x 12\" x 1\"",
        materials: "Epoxy resin, gold pigment, brass handles",
      },
      {
        name: "Sunset Abstract Resin Wall Clock",
        description: "Artistic wall clock featuring beautiful sunset-inspired resin art with orange, red, and purple swirls. Gold metallic accents add luxury while silent quartz movement ensures peaceful timekeeping. Makes a stunning focal point in any room while remaining fully functional.",
        price: "129.99",
        category: "home-decor",
        imageUrl: sunsetClockImage,
        rating: "4.7",
        reviewCount: 92,
        inStock: 7,
        colors: ["Orange", "Red", "Purple", "Gold"],
        dimensions: "12\" diameter",
        materials: "Resin, gold pigment, quartz movement",
      },
      {
        name: "Pastel Resin Drop Earrings",
        description: "Lightweight and elegant teardrop earrings in dreamy pastel pink and lavender tones. The delicate swirl pattern creates a soft watercolor effect. Hypoallergenic gold hooks ensure comfortable all-day wear. Each pair is slightly unique, making them truly special.",
        price: "29.99",
        category: "jewelry",
        imageUrl: pastelEarringsImage,
        rating: "5.0",
        reviewCount: 201,
        inStock: 15,
        colors: ["Pink", "Lavender", "White"],
        dimensions: "2\" drop length",
        materials: "Resin, hypoallergenic gold-plated hooks",
      },
      {
        name: "Teal Geode Resin Wall Art",
        description: "Large statement piece featuring a geode-inspired design in rich teal and silver tones. The crystal-like texture creates stunning visual depth with metallic accents catching the light. This irregular organic shape mimics natural stone formations for an earthy yet luxurious aesthetic.",
        price: "249.99",
        category: "wall-art",
        imageUrl: tealGeodeImage,
        rating: "4.9",
        reviewCount: 64,
        inStock: 2,
        colors: ["Teal", "Silver", "White"],
        dimensions: "20\" x 16\" x 2\"",
        materials: "Premium resin, crushed glass, silver leaf, wood backing",
      },
      {
        name: "Coral Pink Trinket Dish",
        description: "Elegant organic-shaped trinket dish in soft coral pink with white accents and gold rim detail. Perfect for jewelry, keys, or as a decorative piece on a dresser or entryway table. The flowing free-form shape is inspired by natural coral formations.",
        price: "34.99",
        category: "home-decor",
        imageUrl: coralDishImage,
        rating: "4.8",
        reviewCount: 118,
        inStock: 10,
        colors: ["Coral Pink", "White", "Gold"],
        dimensions: "6\" x 5\" x 1\"",
        materials: "Resin, gold leaf edging",
      },
      {
        name: "Navy & Copper Abstract Canvas",
        description: "Bold contemporary wall art featuring fluid navy blue, white, and copper swirls created using advanced resin pouring techniques. The metallic copper creates stunning contrast against deep navy tones. Ready to hang with included hardware. Perfect for modern or industrial interiors.",
        price: "199.99",
        category: "wall-art",
        imageUrl: navyArtImage,
        rating: "5.0",
        reviewCount: 87,
        inStock: 4,
        colors: ["Navy Blue", "Copper", "White"],
        dimensions: "30\" x 20\" x 1.5\"",
        materials: "Epoxy resin, copper pigment, stretched canvas, wood frame",
      },
      {
        name: "Gold & White Marble Coasters",
        description: "Sophisticated set of 4 coasters featuring elegant white marble effects with gold veining. Classic design that complements any decor style. High-gloss finish protects surfaces while looking beautiful. Cork backing prevents scratches and slipping.",
        price: "44.99",
        category: "coasters",
        imageUrl: purpleCoastersImage,
        rating: "4.9",
        reviewCount: 143,
        inStock: 20,
        colors: ["White", "Gold"],
        dimensions: "4\" diameter each",
        materials: "Resin, metallic pigments, cork backing",
      },
      {
        name: "Amethyst Geode Serving Tray",
        description: "Luxurious rectangular serving tray inspired by amethyst geode formations. Features rich purple tones with crystal-like textures and silver accents. Perfect for serving or display. The raised edges keep items secure while showcasing the stunning resin work.",
        price: "89.99",
        category: "trays",
        imageUrl: emeraldTrayImage,
        rating: "4.7",
        reviewCount: 56,
        inStock: 6,
        colors: ["Purple", "Silver", "White"],
        dimensions: "16\" x 10\" x 1.5\"",
        materials: "Resin, crushed glass, silver leaf",
      },
      {
        name: "Turquoise Wave Ring Dish",
        description: "Small decorative dish perfect for rings and small jewelry. Features beautiful turquoise and white wave patterns with gold accents. The compact size makes it ideal for bedside tables or bathroom counters. Unique organic shape adds visual interest.",
        price: "24.99",
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
}

export const storage = new DatabaseStorage();
