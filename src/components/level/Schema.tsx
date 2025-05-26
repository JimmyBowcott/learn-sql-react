import { useMemo, useState } from "react";
import * as schema from "../../data/schema.json";
import { IconCheckbox, IconLetterCase, IconNumbers } from "@tabler/icons-react";
import type { JSX } from "react/jsx-runtime";

type ColumnType = "integer" | "text" | "boolean"

function Schema({tables}: {tables: number[]}) {
  const [index, setIndex] = useState(0);
  const table = useMemo(()=> schema.tables[tables[index]], [index]);

  const icons: Record<ColumnType, JSX.Element> = {
    "integer": <IconNumbers height={18} />,
    "text": <IconLetterCase height={18} />,
    "boolean": <IconCheckbox height={18} />
  }

  const getIcon = (type: string) => {
    if (type in icons) {
      return icons[type as ColumnType]
    }
  }

  return (
    <div className="flex flex-col p-4 gap-4 border-1 border-stone-600">
      <div className="flex justify-around">
        <h2 className="font-bold text-lg cursor-pointer">{table.name}</h2>
      </div>
      <div className="flex flex-col gap-2 justify-center mx-auto">
        {table.columns.map((col, key) => (
          <div key={`col-${key}`} className="flex items-center gap-1">
            {getIcon(col.schema)}
            <p>{col.name}</p>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Schema;
