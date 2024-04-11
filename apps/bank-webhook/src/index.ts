import prisma from "@repo/db/client";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Health check");
});

app.post("/hdfcbank", async (req, res) => {
  console.log("run hdfc bank", req.body);

  const transactionDetails = {
    userId: req.body.userId,
    amount: req.body.amount,
    token: req.body.token,
  };
  try {
    //Find the user and update the amount in his wallet
    await prisma.$transaction([
      prisma.balance.update({
        data: {
          amount: {
            increment: Number(req.body.amount),
          },
        },
        where: {
          userId: Number(transactionDetails.userId),
        },
      }),
      prisma.onRampTransaction.update({
        data: {
          status: "Success",
        },
        where: {
          token: transactionDetails.token,
          status: "Processing",
        },
      }),
    ]);
    res.status(200);
    return res.json({ message: "Captured" });
  } catch (e) {
    console.log("Transaction failed for user", transactionDetails.userId);
    console.error("error", e);
    await prisma.onRampTransaction.update({
      data: {
        status: "Failure",
      },
      where: {
        token: transactionDetails.token,
      },
    });
    res.status(500);
    return res.json({ message: "Transaction failed" });
  }
});

app.listen(3033, () => console.log("Web hook handler running"));
