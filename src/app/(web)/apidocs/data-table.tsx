import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

type Props = {
  title?: string;
  headers: string[];
  rows: ReactNode[][];
};

export default function DataTable({ title, headers, rows }: Props) {
  return (
    <div className="rounded-lg w-full">
      {title && (
        <h3 className="text-lg font-semibold text-slate-800 mb-6">{title}</h3>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                className="text-sm font-semibold text-slate-700"
                key={index}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={`text-sm items-center text-slate-600`}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
