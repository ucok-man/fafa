"use client";

import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "px-6 py-4 sticky top-0 z-40",
        pathname !== "/" &&
          "border-b border-border/50 grainy-light backdrop-blur-sm"
      )}
    >
      <Link
        href={"/"}
        className="flex gap-1 items-center w-full justify-start text-2xl"
      >
        <Code2 className="size-7 fill-red-700" />
        <span className="text-red-800">Anyhow</span>
      </Link>
    </nav>
  );
}
