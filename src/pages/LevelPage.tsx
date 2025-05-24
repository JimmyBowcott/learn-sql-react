import ButtonRow from "../components/level/ButtonRow.tsx";
import Commands from "../components/level/Commands.tsx";
import QueryBox from "../components/level/QueryBox.tsx";
import QueryResult from "../components/level/QueryResult.tsx";
import Tables from "../components/level/Tables.tsx";
import type { Level } from "../types.ts";

function LevelPage({ level }: { level: Level }) {

  return (
    <div className="flex flex-col gap-8 max-w-[900px] w-full h-full items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Level {level.id}</h1>
        <p>{level.description}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row w-full">
          <Commands commands={level.commands} />
          <QueryBox />
          <Tables tables={level.tables} />
        </div>
        <ButtonRow />
      </div>
      <QueryResult />
    </div>
  )
}

export default LevelPage;
