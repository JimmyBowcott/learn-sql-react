import { useState } from "react";

function Commands() {
  const [tab, setTab] = useState<number>(0);

  const clauses = <>
    <button className="cursor-pointer">SELECT</button>
    <button className="cursor-pointer">FROM</button>
    <button className="cursor-pointer">WHERE</button>
    <button className="cursor-pointer">GROUP BY</button>
    <button className="cursor-pointer">HAVING</button>
    <button className="cursor-pointer">ORDER BY</button>
    <button className="cursor-pointer">LIMIT</button>
    <button className="cursor-pointer">OFFSET</button>
    <button className="cursor-pointer">JOIN</button>
    <button className="cursor-pointer">ON</button>
    <button className="cursor-pointer">USING</button>
    <button className="cursor-pointer">UNION</button>
    <button className="cursor-pointer">UNION ALL</button>
    <button className="cursor-pointer">EXCEPT</button>
    <button className="cursor-pointer">INTERSECT</button>
    <button className="cursor-pointer">WITH</button>
    <button className="cursor-pointer">INSERT INTO</button>
    <button className="cursor-pointer">VALUES</button>
    <button className="cursor-pointer">UPDATE</button>
    <button className="cursor-pointer">SET</button>
    <button className="cursor-pointer">DELETE FROM</button>
    <button className="cursor-pointer">CREATE TABLE</button>
    <button className="cursor-pointer">ALTER TABLE</button>
    <button className="cursor-pointer">DROP TABLE</button>
    <button className="cursor-pointer">TRUNCATE TABLE</button>
  </>

  const modifiers = <>
    <button className="cursor-pointer">DISTINCT</button>
    <button className="cursor-pointer">ALL</button>
    <button className="cursor-pointer">TOP</button>
    <button className="cursor-pointer">LIMIT</button>
    <button className="cursor-pointer">OFFSET</button>
    <button className="cursor-pointer">ASC</button>
    <button className="cursor-pointer">DESC</button>
    <button className="cursor-pointer">AS</button>
    <button className="cursor-pointer">ONLY</button>
    <button className="cursor-pointer">RETURNING</button>
  </>

  const operators = <>
    <button className="cursor-pointer">AND</button>
    <button className="cursor-pointer">OR</button>
    <button className="cursor-pointer">NOT</button>
    <button className="cursor-pointer">=</button>
    <button className="cursor-pointer">!=</button>
    <button className="cursor-pointer">&lt;&gt;</button>
    <button className="cursor-pointer">&lt;</button>
    <button className="cursor-pointer">&gt;</button>
    <button className="cursor-pointer">&lt;=</button>
    <button className="cursor-pointer">&gt;=</button>
    <button className="cursor-pointer">BETWEEN</button>
    <button className="cursor-pointer">IN</button>
    <button className="cursor-pointer">LIKE</button>
    <button className="cursor-pointer">ILIKE</button>
    <button className="cursor-pointer">IS NULL</button>
    <button className="cursor-pointer">IS NOT NULL</button>
    <button className="cursor-pointer">EXISTS</button>
    <button className="cursor-pointer">CASE</button>
    <button className="cursor-pointer">WHEN</button>
    <button className="cursor-pointer">THEN</button>
    <button className="cursor-pointer">ELSE</button>
    <button className="cursor-pointer">END</button>
    <button className="cursor-pointer">COALESCE</button>
    <button className="cursor-pointer">NULLIF</button>
    <button className="cursor-pointer">ANY</button>
    <button className="cursor-pointer">ALL</button>
    <button className="cursor-pointer">SOME</button>
  </>

  return (
  <div className="flex flex-col p-4 border-1 border-slate-600">
    <div className="flex flex-row gap-2">
      <button className="font-bold cursor-pointer" onClick={()=>setTab(0)}>Clause</button>
      <button className="font-bold cursor-pointer" onClick={()=>setTab(1)}>Modifier</button>
      <button className="font-bold cursor-pointer" onClick={()=>setTab(2)}>Operator</button>
    </div>
    <div className="flex flex-col">
      {tab === 0 && clauses}
      {tab === 1 && modifiers}
      {tab === 2 && operators}
    </div>
  </div>

  )
}

export default Commands;
