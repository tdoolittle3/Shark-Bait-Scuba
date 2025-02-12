import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import { Administrator } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends Administrator {}
  }
}

export function setupAdminAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.REPL_ID!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    name: 'admin.sid',
  };

  if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    sessionSettings.cookie!.secure = true;
  }

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use('admin', new LocalStrategy(async (username, password, done) => {
    try {
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return done(null, false, { message: "Invalid username or password" });
      }

      const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
      if (!isValidPassword) {
        return done(null, false, { message: "Invalid username or password" });
      }

      return done(null, admin);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const admin = await storage.getAdmin(id);
      if (!admin) {
        return done(new Error('Admin not found'));
      }
      done(null, admin);
    } catch (error) {
      done(error);
    }
  });

  // Middleware to check if user is authenticated
  const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Admin authentication routes
  app.post("/api/admin/login", (req, res, next) => {
    passport.authenticate('admin', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Authentication failed" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({ message: "Login successful", user });
      });
    })(req, res, next);
  });

  app.post("/api/admin/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/admin/user", isAuthenticated, (req, res) => {
    res.json(req.user);
  });

  // Protect admin API routes
  app.use("/api/admin", isAuthenticated);
}