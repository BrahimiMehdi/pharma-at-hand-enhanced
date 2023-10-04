"use client"

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
export const defaultColumn: Partial<ColumnDef<ColumnType>> = {
  cell: ({ getValue, row, column: { id }, table }) => {
    const index = row.index;
    const orig = row.original
    
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
      
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if(id==="TP" && !orig.tp || id==="coeff" || id==="moyenne" || id==="moyenneSansTp") return(
        // @ts-ignore
        <div>{initialValue}</div>
    )
    return (
        <input
          className="max-w-[3rem] outline outline-secondary rounded-md text-center w-full "
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
        )
    ;
  },
};
export function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}
