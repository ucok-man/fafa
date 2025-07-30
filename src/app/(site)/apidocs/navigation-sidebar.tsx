import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useVisibleSection } from "@/hooks/use-visible-section";
import { Menu } from "lucide-react";
import { useState } from "react";

const NAVIGATION_ITEMS = [
  { id: "overview", title: "Overview" },
  { id: "endpoint", title: "Parse Data Endpoint" },
  { id: "examples", title: "Examples" },
  { id: "errors", title: "Error Codes" },
  { id: "schema", title: "Schema Format" },
];

export default function NavigationSidebar() {
  const [open, setOpen] = useState(false);
  const activeSectionId = useVisibleSection(NAVIGATION_ITEMS);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-2.5 z-50 right-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size={"lg"}
              className="w-full justify-start grainy-light"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 grainy-light">
            <SheetTitle className="hidden" />

            <ScrollArea className="h-full">
              <NavigationContent
                items={NAVIGATION_ITEMS}
                onClick={(item) => scrollToSection(item.id)}
                activeSectionId={activeSectionId ?? NAVIGATION_ITEMS[0].id}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block sticky top-[calc(65px+32px)]">
        <Card className="top-6 grainy-light">
          <ScrollArea className="h-[calc(100vh-11.3rem)]">
            <NavigationContent
              items={NAVIGATION_ITEMS}
              onClick={(item) => scrollToSection(item.id)}
              activeSectionId={activeSectionId ?? NAVIGATION_ITEMS[0].id}
            />
          </ScrollArea>
        </Card>
      </div>
    </>
  );
}

type NavigationContentProps = {
  items: { title: string; id: string }[];
  activeSectionId: string;
  onClick: (item: { title: string; id: string }) => void;
};

function NavigationContent({
  items,
  activeSectionId,
  onClick,
}: NavigationContentProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold text-foreground mb-4">Contents</h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start text-left h-auto py-2 px-3 ${
              activeSectionId === item.id
                ? "bg-slate-700/10 text-slate-700 border-l-2 border-slate-700"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => onClick(item)}
          >
            {item.title}
          </Button>
        ))}
      </nav>
    </div>
  );
}
