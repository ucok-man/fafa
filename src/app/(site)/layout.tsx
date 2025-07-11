import { ReactNode } from "react";
import Navbar from "../components/navbar";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="font-recursive text-slate-900">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
