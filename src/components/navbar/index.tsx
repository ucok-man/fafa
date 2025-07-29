import { Code2 } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-4 py-4">
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
