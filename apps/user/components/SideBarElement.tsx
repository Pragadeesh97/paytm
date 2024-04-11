"use client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function SideBarElement({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isSelected = pathname === href;
  console.log("pathname is", pathname, href);
  return (
    <div
      className={clsx(
        isSelected ? "bg-slate-200" : "bg-white",
        "font-medium",
        "text-md",
        "pl-5",
        "cursor-pointer",
        "hover:bg-gray-500",
        "p-2",
        isSelected && "!bg-black",
        isSelected && "!text-white",
        "flex"
      )}
      onClick={() => router.push(href)}
    >
      <div className="pr-2">{icon}</div>
      <div>{name}</div>
    </div>
  );
}
