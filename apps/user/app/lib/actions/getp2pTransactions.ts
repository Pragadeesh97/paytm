"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function getp2pTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  console.log("userId in getp2p", userId);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: userId,
    },
  });
  console.log("transactions are", transactions);
  return transactions;
}
