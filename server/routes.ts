import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import path from "path";

export function registerRoutes(app: Express): Server {
  // Serve uploaded files statically
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  // Public API endpoints
  // Test endpoint to verify API is working
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      message: "Welcome to Shark Bait Scuba API! This message confirms the API is working."
    });
  });

  app.post("/api/checkout", async (req, res) => {
    try {
      const { productId } = req.body;
      const session = await stripe.checkout.sessions.create({
        line_items: [{
          price_data: {
            currency: 'usd',
            product: productId,
            unit_amount_multiplier: 100
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/success`,
        cancel_url: `${req.protocol}://${req.get('host')}/store`,
      });
      
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });

  app.get("/api/products", async (_req, res) => {
    try {
      const { data: products } = await stripe.products.list({
        expand: ['data.default_price']
      });
      
      const formattedProducts = products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: product.default_price ? (product.default_price as any).unit_amount / 100 : 0
      }));
      
      res.json(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
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