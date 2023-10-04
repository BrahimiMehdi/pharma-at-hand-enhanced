"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableHeader"
import { Edit } from "lucide-react"

export const columns: ColumnDef<ColumnType>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
          return (
            <Button size={"icon"} variant="secondary">
            <Edit className="ml-2 h-4 w-4" />
          </Button>
          )
        },
      },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "T1",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="T1" />
      ),
    
  },
  {
    accessorKey: "T2",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="T2" />
      ),
    
  },
  {
    accessorKey: "T3",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="T3" />
      ),
    cell:({row})=>{
        return(
            <input onChange={(e)=>row.original.T3 = e.target.value as any} />
        )
    }
    
  },
  {
    accessorKey: "TP",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="TP" />
      ),
  },
  {
    accessorKey: "coeff",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coefficient" />
      ),
  },
  {
    accessorKey: "moyenneSansTp",

    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Moyenne Sans TP" />
      ),
  },
  {
    accessorKey: "moyenne",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Moyenne" />
      ),
    
  },
];
