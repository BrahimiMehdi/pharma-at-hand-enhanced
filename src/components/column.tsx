"use client"
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableHeader"

export const columns: ColumnDef<ColumnType>[] = [
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //       return (
    //         <Button size={"icon"} variant="secondary">
    //         <Edit className="ml-2 h-4 w-4" />
    //       </Button>
    //       )
    //     },
    //   },
  {
    accessorKey: "name",
    header:"Module",
    cell:({row}) =>{
        const orig= row.original.name
        return(
            <p className="w-full text-center  ">
                {orig}
            </p>
        )
    },

  },
  {
    accessorKey: "T1",
    header: "T1"
  },
  {
    accessorKey: "T2",
    header: "T2"
    
  },
  {
    accessorKey: "T3",
    header: "T3"
    
    
  },
  {
    accessorKey: "TP",
    header: "TP/TD",

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
      cell({row,cell,table}) {
        const original = row.original
        const T1 = original.T1 ? +original.T1 : undefined;
        const T2 = original.T2 ? +original.T2 : undefined;;
        const T3 =original.T3 ? +original.T3 : undefined;;
        const TP = original.TP ? +original.TP : undefined;;
        if(T1 && T2 && !T3){
            if(TP && typeof TP ==="number"){
                const sum = ((T1+T2+TP)/3) 
                return sum.toFixed(2)
            }
            const sum = (((T1+T2)/2))
            
            return sum.toFixed(2)
        }
        else if(T1 && T2 && T3){
            if(TP && typeof TP ==="number"){
                const sum = ((((T1+T2+T3)/3) * 2) + TP)/3
                return sum.toFixed(2)
            }
            const sum = (((T1+T2+T3)/3))
            return sum.toFixed(2)
        }
        else return 0
      },
  },
  
];
