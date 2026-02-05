import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EmptyState from "./EmptyState"

/**
 * Simple reusable data table for SaaS-style lists.
 *
 * columns: [{ key, header, className, render?: (row) => ReactNode }]
 * data: array of objects
 */
const DataTable = ({ columns, data, emptyTitle, emptyDescription }) => {
  if (!data?.length) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    )
  }

  return (
    <div className="bg-white rounded-lg border border-green-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-green-200 hover:bg-transparent">
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={col.headerClassName || "text-gray-700"}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id || row.key || JSON.stringify(row)}
              className="border-green-100 hover:bg-green-50/50"
            >
              {columns.map((col) => (
                <TableCell key={col.key} className={col.className}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable

