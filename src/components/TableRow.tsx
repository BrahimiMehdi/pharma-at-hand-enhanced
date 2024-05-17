"use client";
import { useMainContext } from "@/app/context/MainContext";
import { useState, useEffect } from "react";
import { TableCell, TableRow } from "./ui/table";
import useLocalStorageState from 'use-local-storage-state'

type Props = {
  module: ModuleType;
  inputs: string[];
};

function TableRowWrapper({ module, inputs }: Props) {
  const [T1, setT1] = useLocalStorageState<string | undefined>(`T1${module.name}${module.year}`);
  const [T2, setT2] = useLocalStorageState<string | undefined>(`T2${module.name}${module.year}`);
  const [T3, setT3] = useLocalStorageState<string | undefined>(`T3${module.name}${module.year}`);
  const [TP, setTP] = useLocalStorageState<string | undefined>(`T4${module.name}${module.year}`);
  const [Moyenne, setMoyenne] = useLocalStorageState<string>(`moyenne${module.name}${module.year}`);
  const [MoyenneCoeff, setMoyenneCoeff] = useLocalStorageState<string>(`moyenneCoeff${module.name}${module.year}`);
  const { changeTableModules, tableModules } = useMainContext();
  const calculateMoyenne = () => {
    const t1 = T1 ? +T1 : undefined;
    const t2 = T2 ? +T2 : undefined;
    const t3 = T3 ? +T3 : undefined;
    const tp = TP ? +TP : undefined;
    if (t1 && t2 && !t3) {
      if (tp && typeof tp === "number") {
        const sum = (t1 + t2 + tp) / 3;
        return sum;
      }
      const sum = (t1 + t2) / 2;
      return sum;
    } else if (t1 && t2 && t3) {
      if (tp && typeof tp === "number") {
        const sum = (((t1 + t2 + t3) / 3) * 2 + tp) / 3;
        return sum;
      }
      const sum = (t1 + t2 + t3) / 3;
      return sum;
    }
    return 0;
  };
  useEffect(() => {
    const sum = calculateMoyenne();
    setMoyenne(sum.toFixed(2));
    setMoyenneCoeff((sum * module.coeff).toFixed(2));
    if (sum > 0) changeTableModules(module, sum, sum * module.coeff);
    else {
      changeTableModules(module, 0, 0);
    }
  }, [T1, T2, T3, TP]);

  return (
    <TableRow>
      <TableCell className="text-center">{module.name}</TableCell>
      <TableCell className="text-center">
        <input
          value={T1}
          min={0}
          step="any"
          max={20}
          onChange={(e) => setT1(e.target.value)}
          type="number"
          className="max-w-[4rem] min-w-[3rem] invalid:outline-red-400 outline outline-secondary rounded-md text-center w-full"
        />
      </TableCell>
      <TableCell className="text-center">
        <input
          value={T2}
          min={0}
          step="any"
          
          max={20}
          onChange={(e) => setT2(e.target.value)}
          type="number"
          className="max-w-[4rem] min-w-[3rem] invalid:outline-red-400 outline outline-secondary rounded-md text-center w-full"
        />
      </TableCell>
      <TableCell className="text-center">
        <input
          value={T3}
          min={0}
          max={20}
          step="any"

          onChange={(e) => setT3(e.target.value)}
          type="number"
          className="max-w-[4rem] min-w-[3rem] invalid:outline-red-400 outline outline-secondary rounded-md text-center w-full"
        />
      </TableCell>
      <TableCell className="text-center">
        {module.tp && (
          <input
            value={TP}
            min={0}
            max={20}
          step="any"

            onChange={(e) => setTP(e.target.value)}
            type="number"
            className="max-w-[4rem] invalid:outline-red-400 outline outline-secondary rounded-md text-center w-full"
          />
        )}
      </TableCell>
      <TableCell className="text-center">{module.coeff}</TableCell>
      <TableCell className="text-center">{Moyenne}</TableCell>
      <TableCell className="text-center">{MoyenneCoeff}</TableCell>
    </TableRow>
  );
}

export default TableRowWrapper;
