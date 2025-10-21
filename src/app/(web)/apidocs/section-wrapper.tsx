import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  id?: string;
};

export default function SectionWrapper({ title, children, id }: Props) {
  return (
    <section id={id}>
      <Card className="border grainy-light p-0">
        <div className="border-b p-6">
          <h3 className="text-2xl font-semibold text-red-500">{title}</h3>
        </div>
        <div className="p-6 pt-0">{children}</div>
      </Card>
    </section>
  );
}
