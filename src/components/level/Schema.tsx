import { useMemo, useState } from "react";
import * as schema from "../../data/schema.json";
import { IconCheckbox, IconLetterCase, IconNumbers } from "@tabler/icons-react";
import type { JSX } from "react/jsx-runtime";

type ColumnType = "integer" | "text" | "boolean"

function Schema({ tables, addText }: { tables: number[], addText: (text: string) => void }) {
  const [index, setIndex] = useState<number>(tables[0]);
  const table = useMemo(() => schema.tables[index], [index]);
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const icons: Record<ColumnType, JSX.Element> = {
    "integer": <IconNumbers height={18} />,
    "text": <IconLetterCase height={18} />,
    "boolean": <IconCheckbox height={18} />
  }

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  }

  const getIcon = (type: string) => {
    if (type in icons) {
      return icons[type as ColumnType]
    }
  }

  return (
    <div className="flex flex-col pt-4 w-60 gap-4 border-1 border-stone-600">
      <div className="relative flex justify-around">
        <button
          className="font-bold text-lg cursor-pointer"
          onClick={toggleDropDown}
        >
          {table.name}
        </button>
        {tables.length > 1 && dropDownVisible &&
          <div className="absolute flex flex-col items-center top-8 bg-white rounded-sm w-36 text-stone-900">
            {tables.map((n) => (
              <button
                key={`table-${schema.tables[n].name}`}
                className="cursor-pointer"
                onClick={() => { setIndex(n); toggleDropDown(); }}
              >
                {schema.tables[n].name}
              </button>
            ))}
          </div>
        }
      </div>
      <div className="flex flex-col gap-2 justify-center mx-auto">
        {table.columns.map((col, key) => (
          <div key={`col-${key}`} className="flex items-center gap-1">
            {getIcon(col.schema)}
            <button
              key={`col-${key}-${col.name}`}
              className="cursor-pointer"
              onClick={() => addText(col.name)}
            >
              {col.name}
            </button>
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Schema;
