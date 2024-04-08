"use client";
import { PrismaClient } from "@repo/db/client";
import { AppBar } from "@repo/ui/appbar";

const prisma = new PrismaClient();
export default function Page(): JSX.Element {
  console.log("prisma", prisma);
  return (
    <>
      <AppBar
        user="Pragadeesh"
        onSignin={() => console.log("Sign in")}
        onSignout={() => console.log("Signout")}
      />
    </>
  );
}
