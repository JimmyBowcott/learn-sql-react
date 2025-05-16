import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AppShell from "../AppShell.tsx";
import api from "../api.ts";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import type { Level } from "../types.ts";
import LevelPage from "./LevelPage.tsx";
import LevelsGrid from "../components/LevelsGrid.tsx";

function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const query = new URLSearchParams(useLocation().search)
  const index = Number(query.get("i"))

  useEffect(() => {
    const getLevels = async () => {
      const res = await api.get("/levels");
      return res.data
    }

    getLevels().then((res) => setLevels(res));
  }, [])

  return (
    <AppShell>
      {levels.length == 0 && <LoadingSpinner />}
      {levels.length > 0 && index > 0 && <LevelPage level={levels[index-1]} />}
      {levels.length > 0 && index == 0 && <LevelsGrid levels={levels} />}
    </AppShell>
  )
}

export default LevelsPage;
