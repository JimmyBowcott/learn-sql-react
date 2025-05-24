import { useMemo, useState } from "react";
import * as tableData from "../../data/tables.json";

function Tables({tables}: {tables: number[]}) {
  const [index, setIndex] = useState(0);
  const table = useMemo(()=> tableData.tables[tables[index]], [index]);
  const canGoNext = useMemo<boolean>(()=>index > 0, [index]);
  const canGoPrev = useMemo<boolean>(()=>index < tables.length-1, [index]);

  const nextTable = () => {
    setIndex((prev)=>prev-1)
  }

  const prevTable = () => {
    setIndex((prev)=>prev-1)
  }

  return (
    <div className="flex flex-col p-4 gap-2 border-1 border-stone-600">
      <div className="flex justify-around">
        <p className={`${canGoPrev ? "cursor-pointer" : "text-gray-500"}`} onClick={canGoPrev ? ()=>prevTable() : undefined}>{"<"}</p>
        <p>{table.name}</p>
        <p className={`${canGoNext ? "cursor-pointer" : "text-gray-500"}`} onClick={canGoNext ? ()=>nextTable() : undefined}>{">"}</p>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        {table.columns.map((name, key) => <p key={`table-${key}`} className="cursor-pointer">{name}</p>)}
      </div>
    </div>
  )
}

export default Tables;
