import type { Level } from "../types.ts";

function LevelPage({ level }: { level: Level }) {

  return (
    <p>Level {level.id}</p>
  )
}

export default LevelPage;
