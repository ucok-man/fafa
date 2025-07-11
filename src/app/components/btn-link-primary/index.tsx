import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant: "red" | "green";
  href: string;
};

export default function BtnLinkPrimary({
  children,
  className,
  variant,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block text-2xl sm:text-3xl font-semibold px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-slate-100 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-300 text-center",
        variant === "green" &&
          "bg-green-600 hover:bg-green-700 focus:ring-green-300",
        variant === "red" && "bg-red-600 hover:bg-red-700 focus:ring-red-300",
        className
      )}
    >
      {children}
    </Link>
  );
}
