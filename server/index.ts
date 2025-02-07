import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Development-friendly middleware configuration
app.use((req, res, next) => {
  // Basic security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Allow all origins in development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Enhanced logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  log(`Incoming request: ${req.method} ${req.path}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    log(`${req.method} ${req.path} ${res.statusCode} in ${duration}ms`);
  });
  next();
});

(async () => {
  const server = registerRoutes(app);

  // Global error handler with detailed logging
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      status: err.status || 500
    });
    res.status(500).json({ message: 'Internal Server Error' });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    log('Setting up Vite development server...');
    await setupVite(app, server);
  }

  const PORT = Number(process.env.PORT) || 3000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    log(`Server URL: http://0.0.0.0:${PORT}`);
  });
})();