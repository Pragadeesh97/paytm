"use client";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { ChangeEvent, useState } from "react";
import { peerTransfer } from "../app/lib/actions/peerTransfer";
import { Card } from "@repo/ui/card";

export default function SendMoney() {
  const [contact, setContact] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  return (
    <>
      <Card title="Transfer to contact">
        <Input
          label="Phone Number"
          placeholder="Enter the number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setContact(e.target.value)
          }
          type="text"
        />
        <Input
          label="Amount"
          placeholder="Enter the amount"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value)
          }
          type="text"
        />
        <div className="flex items-center justify-center mt-4">
          <Button
            onClick={async () => {
              await peerTransfer(contact, amount);
            }}
          >
            Send Money
          </Button>
        </div>
      </Card>
    </>
  );
}
