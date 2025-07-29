import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function MaxWidthWrapper({ children, className }: Props) {
  return (
    <section className={cn("h-full mx-auto w-full max-w-7xl px-6", className)}>
      {children}
    </section>
  );
}
