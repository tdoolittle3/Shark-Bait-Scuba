import { 
  contactMessages, diveSites, courses, equipment, staff,
  customers, products, categories, orders, orderItems,
  type ContactMessage, type InsertMessage,
  type DiveSite, type InsertDiveSite,
  type Course, type InsertCourse,
  type Equipment, type InsertEquipment,
  type Staff, type InsertStaff,
  type Customer, type InsertCustomer,
  type Product, type InsertProduct,
  type Category, type InsertCategory,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';

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

  // Customers
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;

  // Products
  createProduct(product: InsertProduct): Promise<Product>;
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  updateProductInventory(id: number, quantity: number): Promise<Product>;

  // Categories
  createCategory(category: InsertCategory): Promise<Category>;
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getCustomerOrders(customerId: number): Promise<Order[]>;
  updateOrderStatus(id: number, status: string): Promise<Order>;

  // Order Items
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
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

  // Customers
  async createCustomer(customerData: InsertCustomer): Promise<Customer> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(customerData.password, saltRounds);

    const customerToInsert = {
      email: customerData.email,
      name: customerData.name,
      passwordHash,
      address: customerData.address,
      phone: customerData.phone
    };

    const [created] = await db.insert(customers).values(customerToInsert).returning();
    return created;
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.email, email));
    return customer;
  }

  // Products
  async createProduct(product: InsertProduct): Promise<Product> {
    const [created] = await db.insert(products).values(product).returning();
    return created;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async updateProductInventory(id: number, quantity: number): Promise<Product> {
    const [updated] = await db
      .update(products)
      .set({ inventory: quantity })
      .where(eq(products.id, id))
      .returning();
    return updated;
  }

  // Categories
  async createCategory(category: InsertCategory): Promise<Category> {
    const [created] = await db.insert(categories).values(category).returning();
    return created;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  // Orders
  async createOrder(order: InsertOrder): Promise<Order> {
    const [created] = await db.insert(orders).values(order).returning();
    return created;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getCustomerOrders(customerId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.customerId, customerId));
  }

  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const [updated] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updated;
  }

  // Order Items
  async createOrderItem(item: InsertOrderItem): Promise<OrderItem> {
    const [created] = await db.insert(orderItems).values(item).returning();
    return created;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
}

export const storage = new DatabaseStorage();