import { IconPlayerPlayFilled } from "@tabler/icons-react";
import QueryBox from "../components/level/QueryBox.tsx";
import QueryResult from "../components/level/QueryResult.tsx";
import Schema from "../components/level/Schema.tsx";
import type { Level } from "../types.ts";
import { useEffect, useState } from "react";
import api from "../api.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router";

interface ApiResponse {
  success: boolean,
  result: any
}

function LevelPage({ level, isLastLevel }: { level: Level, isLastLevel: boolean }) {
  const [lastQuery, setLastQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<any>("");
  const { unlockedLevel, setUnlockedLevel } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    setQuery("");
    setResult("");
  },[level.id])

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
    <div className="flex flex-col gap-8 max-w-[900px] w-full items-center relative">
      {!isLastLevel && <button
        className={`absolute top-0 right-0 text-stone-800 cursor-pointer ${level.id<unlockedLevel ? "bg-green-500" : "bg-stone-700"} px-2 p-1 rounded-lg`}
        onClick={()=>{if (level.id<unlockedLevel) navigate(`/levels?i=${level.id+1}`)}}>
        {"Next level ->"}
      </button>}
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
