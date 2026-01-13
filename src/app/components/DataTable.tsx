import { ReactNode } from "react";
import {
  MoreVertical,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
  onSort?: () => void;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowAction?: (row: T) => void;
  emptyMessage?: string;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  onRowAction,
  emptyMessage = "No data available",
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-[var(--radius-card)] p-8 sm:p-12 text-center">
        <p
          className="text-[13px] sm:text-[14px] text-muted-foreground"
          style={{ fontFamily: "var(--font-family-body)" }}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-left"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() =>
                        column.onSort
                          ? column.onSort()
                          : onSort && onSort(column.key)
                      }
                      className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {column.header}
                      {sortColumn === column.key ? (
                        sortDirection === "asc" ? (
                          <ArrowUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        ) : (
                          <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-40" />
                      )}
                    </button>
                  ) : (
                    <span
                      className="text-[11px] sm:text-[12px] uppercase tracking-wide text-muted-foreground"
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontWeight: "var(--font-weight-medium)",
                      }}
                    >
                      {column.header}
                    </span>
                  )}
                </th>
              ))}
              {onRowAction && (
                <th className="px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 w-10 sm:w-12"></th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-secondary/30 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <div
                      className="text-[13px] sm:text-[14px] text-foreground"
                      style={{
                        fontFamily: "var(--font-family-body)",
                      }}
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </div>
                  </td>
                ))}
                {onRowAction && (
                  <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                    <button
                      onClick={() => onRowAction(row)}
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}