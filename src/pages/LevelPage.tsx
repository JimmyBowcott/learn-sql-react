import { IconPlayerPlayFilled } from "@tabler/icons-react";
import QueryBox from "../components/level/QueryBox.tsx";
import QueryResult from "../components/level/QueryResult.tsx";
import Schema from "../components/level/Schema.tsx";
import type { Level } from "../types.ts";
import { useState } from "react";
import api from "../api.ts";
import { useAuth } from "../context/AuthContext.tsx";

interface ApiResponse {
  success: boolean,
  result: any
}

function LevelPage({ level }: { level: Level }) {
  const [lastQuery, setLastQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<any>("");
  const { unlockedLevel, setUnlockedLevel } = useAuth();

  const validateQuery = () => {
    if (!query.endsWith(";")) {
      setResult("SQL statements must end with a ;")
      return false
    }
    return true
  }

  const sendQuery = async () => {
    try {
      const res = await api.post("/submit", { query, level: level.id })
      return res.data
    } catch (error: any) {
      if (error.response.status === 400) {
        return error.response.data
      } else {
        return "An error has occured. Please try again later."
      }
    }
  }

  const submit = async () => {
    setLastQuery(query);
    if (validateQuery()) {
      setResult("");
      const res: ApiResponse = await sendQuery();
      if (typeof res === "string") {
        setResult(res);
      } else {
        setResult(res.result);
      }
      if (res.success) {
        setUnlockedLevel(Math.max(unlockedLevel, level.id+1));
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-[900px] w-full items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Level {level.id}</h1>
        <p>{level.description}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full">
          <QueryBox text={query} setText={setQuery} />
          <Schema tables={level.tables} />
        </div>
        <button
          className={`mr-auto cursor-pointer ${query === lastQuery ? "text-stone-600" : ""}`}
          onClick={() => { if (query !== lastQuery) submit() }}>
          <IconPlayerPlayFilled />
        </button>
      </div>
      <QueryResult res={result} />
    </div>
  )
}

export default LevelPage;
