
import { storage } from "./storage";

async function setupAdmin() {
  try {
    await storage.createAdmin({
      username: "admin",
      password: "admin123",
      email: "admin@sharkbait.com"
    });
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Failed to create admin:", error);
  }
  process.exit();
}

setupAdmin();
