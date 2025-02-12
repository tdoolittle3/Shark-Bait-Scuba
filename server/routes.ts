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