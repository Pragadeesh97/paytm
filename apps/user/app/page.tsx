import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page(): JSX.Element {
  const session = await getServerSession(authOptions);
  console.log("session is: ", session);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
  return <></>;
}
