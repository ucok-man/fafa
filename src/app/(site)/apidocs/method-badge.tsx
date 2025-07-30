import { Badge } from "@/components/ui/badge";

type Props = {
  method: string;
};

export default function MethodBadge({ method }: Props) {
  const getMethodColor = (method: string) => {
    switch (method.toUpperCase()) {
      case "POST":
        return "text-blue-100 bg-blue-600";
    }
  };

  return (
    <Badge className={`font-bold ${getMethodColor(method)}`}>
      {method.toUpperCase()}
    </Badge>
  );
}
