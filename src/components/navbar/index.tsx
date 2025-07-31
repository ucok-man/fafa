"use client";

import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "px-6 py-4 sticky top-0 z-40 transition-all",
        pathname === "/" && !isScrolling
          ? "bg-none! border-none backdrop-blur-none"
          : "border-b border-border/50 grainy-light"
      )}
    >
      <Link
        href={"/"}
        className="flex gap-1.5 items-center w-full justify-start text-2xl"
      >
        <Code2 className="size-7 fill-red-700" />
        <span className="text-red-800">Fafa</span>
      </Link>
    </nav>
  );
}
