import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { insertMessageSchema, insertProductSchema } from "@shared/schema";
import path from "path";
import multer from "multer";
import { mkdirSync } from "fs";

interface CartItem {
  id: string;
  quantity: number;
}

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  })
});

export function registerRoutes(app: Express): Server {
  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Public API endpoints
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      message: "Welcome to Shark Bait Scuba API! This message confirms the API is working."
    });
  });

  // Products API
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json({
        message: "Products retrieved successfully",
        count: products.length,
        data: products
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ 
        error: 'Failed to fetch products',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.json({
        message: "Product created successfully",
        data: product
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(400).json({ 
        error: 'Failed to create product',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post("/api/products/:id/images", upload.array('images'), async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const imageUrls = files.map(file => `/uploads/${file.filename}`);

      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await storage.updateProduct(productId, {
        imageUrls: [...(product.imageUrls || []), ...imageUrls]
      });

      res.json({
        message: "Images uploaded successfully",
        data: updatedProduct
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      res.status(500).json({ 
        error: 'Failed to upload images',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const product = await storage.updateProduct(productId, req.body);
      res.json({
        message: "Product updated successfully",
        data: product
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(400).json({ 
        error: 'Failed to update product',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(productId);
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(deleted);
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ 
        error: 'Failed to delete product',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { items } = req.body as { items: CartItem[] };
      const line_items = await Promise.all(items.map(async item => {
        const product = await storage.getProduct(parseInt(item.id));
        if (!product) throw new Error(`Product not found: ${item.id}`);

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: product.imageUrls || []
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity || 1
        };
      }));

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/checkout/cancel`,
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ 
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
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

  const httpServer = createServer(app);
  return httpServer;
}