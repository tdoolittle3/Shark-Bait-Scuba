import express from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import path from "path";
import { stripe } from "./stripe";

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

  app.post("/api/checkout", async (req, res) => {
    try {
      const { productId } = req.body;

      // Get product details from our products list
      const { data: products } = await stripe.products.list({
        ids: [productId],
        expand: ['data.default_price']
      });

      if (!products || products.length === 0) {
        throw new Error('Product not found');
      }

      const product = products[0];
      const price = product.default_price as any;

      if (!price) {
        throw new Error('Product has no price defined');
      }

      // Create Stripe checkout session
      const { items } = req.body;
      
      // Get products from Stripe to get their price IDs
      const { data: products } = await stripe.products.list({
        expand: ['data.default_price'],
        ids: items.map(item => item.id)
      });

      const line_items = products.map(product => {
        const cartItem = items.find(item => item.id === product.id);
        const price = product.default_price as any;
        return {
          price: price.id,
          quantity: cartItem.quantity
        };
      });

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

  app.get("/api/products", async (_req, res) => {
    try {
      const { data: products } = await stripe.products.list({
        expand: ['data.default_price'],
        active: true
      });

      const formattedProducts = products.map(product => {
        const price = product.default_price as any;
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.images[0],
          price: price ? price.unit_amount / 100 : 0,
          priceId: price ? price.id : null
        };
      });

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