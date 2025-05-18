import type { Level } from "../../types";
import LevelCard from "./LevelCard";

function LevelsGrid({ levels }: { levels: Level[] }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {levels.map((level, key) => (
        <LevelCard key={`level-${key}`} level={level} />
      ))
      }
    </div>
  )
}

export default LevelsGrid;
