"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import Select from "@repo/ui/select";
import { ChangeEvent, useState } from "react";
import { onRamp } from "../../lib/actions/onRampTransaction";

export default function Transfer() {
  return (
    <>
      <div className="flex flex-col gap-2 min-w-max">
        <div className="font-bold text-xl mb-3 mt-2"> Transfer</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <AddMoneyComponent />
          </div>
          <div>
            <div>
              <BalanceComponent
                lockedBalance="0"
                unlockedBalance="0"
                totalBalance="0"
              />
            </div>
            <div>
              <RecentTransactions recents={[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function AddMoneyComponent() {
  const banks = [
    { key: "hdfc", label: "HDFC" },
    { key: "axis", label: "Axis" },
    { key: "sbi", label: "SBI" },
  ];
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("HDFC");
  return (
    <Card title="Add Money">
      <Input
        label="Amount"
        type="text"
        placeholder="Enter Amount"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setAmount(e.target.value);
        }}
      />
      <Select
        options={banks}
        label="Bank"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          console.log("Bank is:", e.target.value);
          setBank(e.target.value);
        }}
      />
      <div className="mt-4">
        <Button
          onClick={() => {
            onRamp(amount, bank);
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
}
function BalanceComponent({
  unlockedBalance,
  lockedBalance,
  totalBalance,
}: {
  unlockedBalance: string;
  lockedBalance: string;
  totalBalance: string;
}) {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b font-normal mb-1">
        <p>Unlocked balance </p>
        <p>{unlockedBalance} INR</p>
      </div>
      <div className="flex justify-between border-b font-normal mb-1">
        <p>Total locked balance</p>
        <p>{lockedBalance} INR</p>
      </div>
      <div className="flex justify-between border-b font-normal mb-1">
        <p>Total Unlocked balance</p>
        <p>{totalBalance} INR</p>
      </div>
    </Card>
  );
}

interface Transaction {
  id: number;
  amount: number;
  description: string;
  // Add more properties as needed
}

function RecentTransactions({ recents }: { recents: Transaction[] }) {
  return (
    <Card title="Recent Transactions">
      {recents.length > 0 ? (
        recents.map((ele) => {
          return <div>Amount: {ele.amount}</div>;
        })
      ) : (
        <p className="py-16 text-center">No Recent transactions</p>
      )}
    </Card>
  );
}
