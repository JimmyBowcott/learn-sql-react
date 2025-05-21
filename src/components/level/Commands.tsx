import { useState } from "react";
import * as queries from "../../data/queries.json";

function Commands({commands}: {commands: Record<string, string[]>}) {
  const [activeTab, setActiveTab] = useState("clauses");

  return (
    <div className="flex flex-col p-4 border-1 border-slate-600">
      {
        Object.keys(commands).map((category, key) => {
          return commands[category]?.map((command, i) => (
            <p key={`command-${key}-${i}`}>{command}</p>
          )
        )}
      )}
    </div>
  )

}

export default Commands;
