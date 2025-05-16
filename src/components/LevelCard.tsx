import type { Level } from "../types";
import { useNavigate } from "react-router";

function LevelCard({ level }: { level: Level }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-32 h-32 rounded-xl shadow-md 
      bg-stone-800 border-2 border-stone-800 hover:border-red-500 cursor-pointer"
      onClick={()=>navigate(`/levels?i=${level.id}`)}>
      <p>{level.id}</p>
    </div>
  )
}

export default LevelCard;
