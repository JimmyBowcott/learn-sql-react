import type { Level } from "../../types";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useMemo } from "react";
import { IconLockFilled, IconCheck } from "@tabler/icons-react";

function LevelCard({ level }: { level: Level }) {
  const navigate = useNavigate();
  const { unlockedLevel } = useAuth();
  const locked = useMemo<boolean>(()=>level.id>unlockedLevel, [unlockedLevel]);
  const completed = useMemo<boolean>(()=>level.id<unlockedLevel, [unlockedLevel]);

  return (
    <div className={`flex flex-col relative items-center justify-center w-32 h-32 rounded-xl shadow-md 
      bg-stone-800 border-2 border-stone-800 ${locked ? "" : "hover:border-red-500 cursor-pointer"}`}
      onClick={()=>{ if (!locked) navigate(`/levels?i=${level.id}`) }}>
      <p className="font-bold text-3xl">{level.id}</p>
      {locked && <IconLockFilled size="1.5rem" className="absolute top-2 right-2 opacity-10" />}
      {completed && <IconCheck size="1.5rem" className="absolute top-2 right-2 stroke-green-600" />}
    </div>
  )
}

export default LevelCard;
