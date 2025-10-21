import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  status: number;
  className?: string;
}

export default function StatusBadge({ status, className }: Props) {
  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 bg-green-600";
    if (status >= 400 && status < 500) return "text-yellow-100 bg-yellow-500";
    if (status >= 500) return "text-red-100 bg-red-600";
  };

  return (
    <Badge className={cn("font-medium", getStatusColor(status), className)}>
      {status}
    </Badge>
  );
}
