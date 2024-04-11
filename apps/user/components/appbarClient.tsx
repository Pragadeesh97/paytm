"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppBarClient() {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      <AppBar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={() => {
          console.log("Signout clicked, routing to signin page");
          router.push("/api/auth/signin");
          signOut();
        }}
      />
    </>
  );
}
