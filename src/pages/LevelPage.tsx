import { IconPlayerPlayFilled } from "@tabler/icons-react";
import QueryBox from "../components/level/QueryBox.tsx";
import QueryResult from "../components/level/QueryResult.tsx";
import Schema from "../components/level/Schema.tsx";
import type { Level } from "../types.ts";
import { useState } from "react";
import api from "../api.ts";

function LevelPage({ level }: { level: Level }) {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<any>("");

  const validateQuery = () => {
    if (!query.endsWith(";")) {
      setResult("SQL statements must end with a ;")
      return false
    }
    return true
  }

  const sendQuery = async () => {
    try {
      const res = await api.post("/exec", query, { headers: { "Content-Type": "text/plain" } })
      return res.data
    } catch {
      return "An error has occured. Please try again later."
    }
  }

  const submit = async () => {
    setResult("");
    if (validateQuery()) {
      const res = await sendQuery();
      setResult(res);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-[900px] w-full h-full items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Level {level.id}</h1>
        <p>{level.description}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full">
          <QueryBox text={query} setText={setQuery} />
          <Schema tables={level.tables} />
        </div>
        <button className="mr-auto cursor-pointer" onClick={()=>submit()}><IconPlayerPlayFilled /></button>
      </div>
      <QueryResult res={result}/>
    </div>
  )
}

export default LevelPage;
