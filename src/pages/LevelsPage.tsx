import { useEffect, useState } from "react";
import AppShell from "../AppShell.tsx";
import LevelCard from "../components/LevelCard.tsx"
import api from "../api.ts";
import type { Level } from "../types.ts";

function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(()=> {
    const getLevels = async () => {
      const res = await api.get("/levels");
      return res.data
    }

    getLevels().then((res)=>setLevels(res));
  },[])

  return <AppShell>
  </AppShell> 
}

export default LevelsPage;
