import type { Level } from "../../types";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useMemo } from "react";

function LevelCard({ level }: { level: Level }) {
  const navigate = useNavigate();
  const { unlockedLevel } = useAuth();
  const locked = useMemo<boolean>(()=>level.id>unlockedLevel, [unlockedLevel])

  return (
    <div className={`flex flex-col items-center justify-center w-32 h-32 rounded-xl shadow-md 
      bg-stone-800 border-2 border-stone-800 ${locked ? "" : "hover:border-red-500 cursor-pointer"}`}
      onClick={()=>{ if (!locked) navigate(`/levels?i=${level.id}`) }}>
      <p>{level.id}</p>
      {locked && <p>locked</p>}
    </div>
  )
}

export default LevelCard;
