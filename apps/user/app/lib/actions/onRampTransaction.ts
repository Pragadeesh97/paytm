"use server";
import prisma from "../../../../../node_modules/@repo/db/index";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function onRamp(amount: string, bank: string) {
  console.log(amount, bank);
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  console.log("bank", bank);
  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    return {
      message: "User is not logged in",
    };
  }
  try {
    const token = Math.random().toString();
    await prisma.onRampTransaction.create({
      data: {
        status: "Processing",
        token: token,
        provider: bank,
        amount: Number(amount),
        startTime: new Date(),
        userId: Number(userId),
      },
    });
    return { message: "onRamp Created", token: token };
  } catch (e) {
    console.log("Error occured while onRamping", e);
    return { message: "Error", token: null };
  }
}
