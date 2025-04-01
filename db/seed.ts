/** @format */

import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient(); // Move outside function for better scope handling

async function main() {
  try {
    await prisma.product.deleteMany(); // Clear existing data
    await prisma.product.createMany({ data: sampleData.products }); // Insert new data
    console.log("Sample data inserted successfully!");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects after execution
  }
}

main();
