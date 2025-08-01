"use server";

import { db } from "@/db/drizzle";
import { Product, product } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function getProducts() {
  try {
    const allProducts = await db.select().from(product);
    return allProducts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get products");
  }
}

export async function createProduct(
  p: Omit<Product, "id" | "createdAt" | "updatedAt">
) {
  try {
    await db.insert(product).values(p);
    return {
      status: true,
      message: "Product added successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to add product",
    };
  }
}

export async function updateProduct(
  p: Omit<Product, "createdAt" | "updatedAt">
) {
  try {
    await db.update(product).set(p).where(eq(product.id, p.id));
    return {
      status: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    return {
      status: false,
      message: "Failed to update product",
    };
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(product).where(eq(product.id, id));
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete product");
  }
}
