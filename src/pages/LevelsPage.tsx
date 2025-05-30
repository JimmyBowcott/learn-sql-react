import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import AppShell from "../AppShell.tsx";
import api from "../api.ts";
import LoadingSpinner from "../components/utility/LoadingSpinner.tsx";
import type { Level } from "../types.ts";
import LevelPage from "./LevelPage.tsx";
import LevelsGrid from "../components/cards/LevelsGrid.tsx";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.tsx";

function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const query = new URLSearchParams(useLocation().search)
  const index = Number(query.get("i"))
  const navigate = useNavigate();
  const { unlockedLevel } = useAuth();

  useEffect(()=>{
    if (index >= levels.length || index > unlockedLevel) {
      navigate("/levels");
    }
  },[index])

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
      {levels.length > 0 && index > 0 && <LevelPage level={levels[index-1]} isLastLevel={index===levels.length} />}
      {levels.length > 0 && index == 0 && <LevelsGrid levels={levels} />}
    </AppShell>
  )
}

export default LevelsPage;
