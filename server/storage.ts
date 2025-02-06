import { 
  contactMessages, diveSites, courses, equipment, staff,
  type ContactMessage, type InsertMessage,
  type DiveSite, type InsertDiveSite,
  type Course, type InsertCourse,
  type Equipment, type InsertEquipment,
  type Staff, type InsertStaff
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Contact Messages
  createMessage(message: InsertMessage): Promise<ContactMessage>;
  getMessages(): Promise<ContactMessage[]>;

  // Dive Sites
  createDiveSite(site: InsertDiveSite): Promise<DiveSite>;
  getDiveSites(): Promise<DiveSite[]>;
  getDiveSite(id: number): Promise<DiveSite | undefined>;

  // Courses
  createCourse(course: InsertCourse): Promise<Course>;
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;

  // Equipment
  createEquipment(item: InsertEquipment): Promise<Equipment>;
  getEquipment(): Promise<Equipment[]>;
  getEquipmentItem(id: number): Promise<Equipment | undefined>;

  // Staff
  createStaffMember(member: InsertStaff): Promise<Staff>;
  getStaffMembers(): Promise<Staff[]>;
  getStaffMember(id: number): Promise<Staff | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Contact Messages
  async createMessage(message: InsertMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  async getMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(contactMessages.createdAt);
  }

  // Dive Sites
  async createDiveSite(site: InsertDiveSite): Promise<DiveSite> {
    const [created] = await db.insert(diveSites).values(site).returning();
    return created;
  }

  async getDiveSites(): Promise<DiveSite[]> {
    return await db.select().from(diveSites);
  }

  async getDiveSite(id: number): Promise<DiveSite | undefined> {
    const [site] = await db.select().from(diveSites).where(eq(diveSites.id, id));
    return site;
  }

  // Courses
  async createCourse(course: InsertCourse): Promise<Course> {
    const [created] = await db.insert(courses).values(course).returning();
    return created;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  // Equipment
  async createEquipment(item: InsertEquipment): Promise<Equipment> {
    const [created] = await db.insert(equipment).values(item).returning();
    return created;
  }

  async getEquipment(): Promise<Equipment[]> {
    return await db.select().from(equipment);
  }

  async getEquipmentItem(id: number): Promise<Equipment | undefined> {
    const [item] = await db.select().from(equipment).where(eq(equipment.id, id));
    return item;
  }

  // Staff
  async createStaffMember(member: InsertStaff): Promise<Staff> {
    const [created] = await db.insert(staff).values(member).returning();
    return created;
  }

  async getStaffMembers(): Promise<Staff[]> {
    return await db.select().from(staff);
  }

  async getStaffMember(id: number): Promise<Staff | undefined> {
    const [member] = await db.select().from(staff).where(eq(staff.id, id));
    return member;
  }
}

export const storage = new DatabaseStorage();