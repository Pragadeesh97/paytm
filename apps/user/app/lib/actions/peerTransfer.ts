"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function peerTransfer(number: string, amount: string) {
  console.log(`number:${number}, amount: ${amount}`);
  const session = await getServerSession(authOptions);
  const fromUserId = Number(session.user.id);
  console.log("fromUserId is:", fromUserId);
  if (!fromUserId) {
    return { message: "User not logged in" };
  }
  const balance = await prisma.balance.findUnique({
    where: {
      userId: fromUserId,
    },
  });
  const toUser = await prisma.user.findFirst({
    where: {
      number: number,
    },
  });
  if (!toUser) {
    return { message: "Payee does not exist" };
  }
  if (!balance) {
    return { message: "No balance in the user account" };
  }
  if (balance && !(balance.amount > Number(amount))) {
    return {
      message: "Insufficient funds in user account",
    };
  }
  try {
    prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;

      await tx.balance.update({
        data: {
          amount: {
            decrement: Number(amount),
          },
        },
        where: {
          userId: fromUserId,
        },
      });

      await tx.balance.update({
        data: {
          amount: {
            increment: Number(amount),
          },
        },
        where: {
          userId: toUser.id,
        },
      });
      await tx.p2pTransfer.create({
        data: {
          amount: Number(amount),
          timestamp: new Date(),
          fromUserId: fromUserId,
          toUserId: toUser.id,
        },
      });
      return { message: "Balance trasferred successfully" };
    });
  } catch (e) {
    console.log("Error while updating the transaction", e);
    throw Error();
  }
}
