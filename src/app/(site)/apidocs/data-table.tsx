import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

type Props = {
  title?: string;
  headers: string[];
  rows: ReactNode[][];
};

export default function DataTable({ title, headers, rows }: Props) {
  // Dynamically set the number of columns based on the headers provided.
  const gridColsClass = `md:grid-cols-${headers.length}`;

  return (
    <div className="rounded-lg w-full">
      {title && (
        <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
      )}
      <div className="space-y-4">
        {/* Header Row */}
        <div
          className={`grid grid-cols-1 ${gridColsClass} gap-4 text-sm font-medium text-slate-700`}
        >
          {headers.map((header, index) => (
            <div key={index}>{header}</div>
          ))}
        </div>

        <Separator />

        {/* Body Rows are mapped from the `rows` prop */}
        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-1 ${gridColsClass} gap-4 text-sm items-center`}
            >
              {row.map((cell, cellIndex) => (
                <div key={cellIndex}>{cell}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
