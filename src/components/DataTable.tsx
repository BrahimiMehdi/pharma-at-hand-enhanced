"use client"

import * as React from "react"
import { defaultColumn,useSkipper } from "./DefaultColumn"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  RowData
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
declare module '@tanstack/react-table' {
    
    interface  TableMeta<TData extends RowData> {
      updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  originalData: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  originalData,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const [data,setData] = React.useState(originalData)
  const table = useReactTable({
    // @ts-ignore
    data,
    // @ts-ignore

    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,

    },
    meta: {
        updateData: (rowIndex, columnId, value) => {
          // Skip page index reset until after next rerender
          skipAutoResetPageIndex()
          setData(old =>
            old.map((row, index) => {
              if (index === rowIndex) {
                return {
                  ...old[rowIndex]!,
                  [columnId]: value,
                }
              }
              return row
            })
          )
        },
      },
      debugTable: true,
  })

  return (
    <div className="rounded-md w-full border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-center bg-secondary  border-r" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-center max-w-[10rem]" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24  text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
