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
    <div className="flex justify-between px-1 py-1 border-b items-center bg-gray-400">
      <div className="text-sm font-bold">PayTM</div>
      <Button onClick={user ? onSignout : onSignin}>
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  );
}
