import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import fs from "fs";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG and WebP images are allowed.'));
    }
  }
});

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export function registerRoutes(app: Express): Server {
  // Serve uploaded files statically
  app.use('/uploads', express.static(uploadDir));

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

  // Update a product
  app.patch("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid product ID",
          help: "The ID should be a number"
        });
      }

      // Create a partial schema for updates
      const updateProductSchema = insertProductSchema.partial();
      const data = updateProductSchema.parse(req.body);

      const product = await storage.updateProduct(id, data);
      if (!product) {
        return res.status(404).json({ 
          message: "Product not found",
          help: "Check if the product ID exists"
        });
      }

      res.json({
        message: "Successfully updated product",
        data: product
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to update product",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Upload product image
  app.post("/api/products/:id/image", upload.single('image'), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          message: "Invalid product ID"
        });
      }

      if (!req.file) {
        return res.status(400).json({ 
          message: "No image file provided"
        });
      }

      const timestamp = Date.now();
      const filename = `product-${id}-${timestamp}.webp`;
      const filepath = path.join(uploadDir, filename);

      // Process and save the image
      await sharp(req.file.buffer)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(filepath);

      // Update product with new image URL
      const imageUrl = `/uploads/${filename}`;
      const product = await storage.updateProduct(id, { imageUrl });

      res.json({
        message: "Image uploaded successfully",
        data: product
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to upload image",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}