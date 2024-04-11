import { Card } from "@repo/ui/card";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import SendMoney from "../../../components/sendMoneyComponent";

export async function getp2pTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;
  console.log("userId in getp2p", userId);
  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(userId),
    },
    select: {
      id: true,
      amount: true,
      toUser: {
        select: {
          name: true,
        },
      },
      timestamp: true,
    },
  });
  console.log("transactions are", transactions);
  return transactions;
}

export default async function p2p() {
  const transactions = await getp2pTransactions();
  return (
    <>
      <div className="flex items-center justify-center py-5">
        <SendMoney />
      </div>
      <div className="flex- pl-2">
        <Card title="Transactions">
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div className="border-b mt-2" key={transaction.id}>
                <p className="font-thin font-medium">
                  To: {transaction.toUser.name}
                </p>
                <p className="font-thin font-medium">
                  Amount: {transaction.amount}
                </p>
                <p className="font-thin font-medium">
                  Time: {String(transaction.timestamp)}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-center p-5">
              No recent transactions
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
