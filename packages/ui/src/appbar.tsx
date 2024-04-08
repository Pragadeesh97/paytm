"use client";

import { Button } from "./button";

export function AppBar({
  user,
  onSignin,
  onSignout,
}: {
  user: any;
  onSignin: any;
  onSignout: any;
}) {
  return (
    <div className="flex justify-between px-2 py-2">
      <div className="text-sm">PayTM</div>
      <Button onClick={() => (user ? onSignin : onSignout)}>
        {user ? "Login" : "Logout"}
      </Button>
    </div>
  );
}
