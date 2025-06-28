import { IconPlayerPlayFilled } from "@tabler/icons-react";
import QueryBox from "../components/level/QueryBox.tsx";
import QueryResult from "../components/level/QueryResult.tsx";
import Schema from "../components/level/Schema.tsx";
import type { Level } from "../types.ts";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest.tsx";

interface ApiResponse {
  success: boolean,
  result: any,
  token: string
}

function LevelPage({ level, isLastLevel }: { level: Level, isLastLevel: boolean }) {
  const [lastQuery, setLastQuery] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<any>("");
  const [lastInputWasButton, setLastInputWasButton] = useState<boolean>(false);
  const { unlockedLevel, setUnlockedLevel, setToken } = useAuth();
  const navigate = useNavigate();
  const { request } = useRequest();

  useEffect(()=>{
    const handleCtrlEnter = (e: any) => {
      if (e.key === "Enter" && e.ctrlKey && query !== lastQuery) {
        submit();
      }
    }
    window.addEventListener("keydown", handleCtrlEnter);
    return ()=> window.removeEventListener("keydown", handleCtrlEnter);
  })

  useEffect(() => {
    setQuery("");
    setResult("");
  }, [level.id]);

  const addText = (text: string) => {
    if (lastInputWasButton) {
      setQuery((prev)=>prev+", ");
    } else if (query.length > 0 && query[query.length-1] !== " ") {
      setQuery((prev)=>prev+" ");
    }
    setQuery((prev)=>prev+text);
    setLastInputWasButton(true);
  }

  const validateQuery = () => {
    if (!query.endsWith(";")) {
      setResult("SQL statements must end with a ;");
      return false
    }
    return true
  }

  const sendQuery = async () => {
    try {
      const res = await request("post", "/submit", { query, level: level.id });
      return res
    } catch (error: any) {
      try {
        if (error.startsWith("Failed to execute query: pq: ")) {
          return error.slice(29,30).toUpperCase() + error.slice(30,) + ".";
        } else {
          return "An error has occured. Please try again later."
        }
      } catch (err) {
        return "An error has occured. Please try again later."
      }
    }
  }

  const submit = async () => {
    setLastQuery(query);
    if (validateQuery()) {
      setResult("");

      const res: ApiResponse | string = await sendQuery();

      if (typeof res === "string") {
        setResult(res);
      } else {
        setResult(res.result);
        if (res.success && level.id === unlockedLevel) {
          setToken(res.token)
          setUnlockedLevel(level.id + 1);
        }
      }
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-[900px] w-full items-center relative">
      {!isLastLevel && <button
        className={`absolute top-0 right-0 text-stone-800 cursor-pointer ${level.id < unlockedLevel ? "bg-green-500" : "bg-stone-700"} px-2 p-1 rounded-lg`}
        onClick={() => { if (level.id < unlockedLevel) navigate(`/levels?i=${level.id + 1}`) }}>
        {"Next level ->"}
      </button>}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Level {level.id}</h1>
        <p>{level.description}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full">
          <QueryBox text={query} setText={setQuery} setLastInputWasButton={setLastInputWasButton} />
          <Schema tables={level.tables} addText={addText} />
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
