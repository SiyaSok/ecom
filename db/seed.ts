/** @format */

import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";

const prisma = new PrismaClient(); // Move outside function for better scope handling

async function main() {
  try {
    await prisma.product.deleteMany();

    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.product.createMany({ data: sampleData.products });

    await prisma.user.createMany({ data: sampleData.users });

    console.log("Sample data inserted successfully!");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
