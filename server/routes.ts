import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Test endpoint to verify API is working
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      message: "Welcome to Shark Bait Scuba API! This message confirms the API is working."
    });
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(data);
      res.json({
        message: "Contact message received successfully",
        data: message
      });
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid form data",
        error: error instanceof Error ? error.message : "Unknown error",
        help: "Make sure to include name, email, and message in your request"
      });
    }
  });

  // Products route
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json({
        message: "Successfully retrieved products",
        count: products.length,
        data: products
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get a single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid product ID",
          help: "The ID should be a number, for example: /api/products/1"
        });
      }

      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ 
          message: "Product not found",
          help: "Try a different product ID or check /api/products for available products"
        });
      }

      res.json({
        message: "Successfully retrieved product",
        data: product
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to fetch product",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}