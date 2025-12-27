import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { db } from "./db";
import { orders, type InsertOrder } from "@shared/schema";
import { sendOrderConfirmationEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {

  // Seed products on startup
  await storage.seedProducts();

  // ------------------------------------------------------
  // PRODUCTS
  // ------------------------------------------------------

  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching products: " + error.message });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching product: " + error.message });
    }
  });

  // ------------------------------------------------------
  // ORDER CREATION (dummy payment)
  // ------------------------------------------------------

  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
      }

      const newOrder: InsertOrder = {
        customerInfo: { name: "Ravi Kumar", email: "ravi@example.com" },
        shippingAddress: { street: "123 Main St", city: "Chennai" },
        totalAmount: amount,
        status: "pending",
      };

      const [order] = await db.insert(orders).values(newOrder).returning();

      res.json({
        orderId: order.id,
        message: "Order created successfully",
      });

    } catch (error: any) {
      res.status(500).json({ message: "Error creating order: " + error.message });
    }
  });

  // ------------------------------------------------------
  // ORDER CREATION (real with items)
  // ------------------------------------------------------

  app.post("/api/orders", async (req, res) => {
    try {
      const { items, ...orderData } = req.body;
      // const { orderId, email, items, totalAmount } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must include items" });
      }

      const validatedOrder = insertOrderSchema.parse(orderData);
      const order = await storage.createOrder(validatedOrder);
      // await sendOrderConfirmationEmail({
      //   to: customerInfo.email,
      //   orderId: order.id.toString(),
      //   items,
      //   totalAmount: Number(order.totalAmount),
      // });
      for (const item of items) {
        const orderItemData = {
          orderId: order.id.toString(),
          productId: String(item.productId),
          productName: item.name,
          productPrice: item.price.toString(),
          quantity: item.quantity,
        };

        const validatedItem = insertOrderItemSchema.parse(orderItemData);
        await storage.createOrderItem(validatedItem);

        
      }

      res.status(201).json({
        success: true,
        orderId: order.id.toString(),
        message: "Order placed successfully",
      });

    } catch (error: any) {
      console.error("Order API Error:", error);
      res.status(400).json({ message: error.message });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // ------------------------------------------------------
  // ADMIN API
  // ------------------------------------------------------

  // Add Product
  app.post("/api/admin/add-product", async (req, res) => {
    try {
      const { name, description, price, imageUrl } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: "Name & price are required" });
      }

      const product = await storage.createProduct({
        name,
        description,
        price: Number(price),
        imageUrl,
      });

      res.json({ success: true, product });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update order status
  app.post("/api/admin/update-order-status", async (req, res) => {
    try {
      const { orderId, status } = req.body;

      if (!orderId || !status) {
        return res.status(400).json({ message: "orderId & status are required" });
      }

      const updated = await db
        .update(orders)
        .set({ status })
        .where(orders.id.eq(orderId))
        .returning();

      res.json({ success: true, updated });

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get ALL orders (for admin)
  app.get("/api/orders-all", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  // ------------------------------------------------------
  // RETURN HTTP SERVER
  // ------------------------------------------------------

  const httpServer = createServer(app);
  return httpServer;
}
