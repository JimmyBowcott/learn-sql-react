import { useEffect, useMemo, useState } from "react";
import * as queries from "../../data/queries.json";
import type { JSX } from "react/jsx-runtime";

function Commands({ commands }: { commands: Record<string, string[]> }) {
  const [tabs, setTabs] = useState<JSX.Element[]>([]);
  const [activeTab, setActiveTab] = useState<string>(Object.keys(commands)[0]);
  const [activeSubTab, setActiveSubTab] = useState<number>(0);
  const [keywords, setKeywords] = useState<JSX.Element[]>([]);
  const canIncrementSubTab = useMemo<boolean>(()=>activeSubTab > 0, [activeSubTab]);
  const canDecrementSubTab = useMemo<boolean>(()=>activeSubTab < commands[activeTab].length-1, [commands, activeTab, activeSubTab])

  useEffect(() => {
    const elements: JSX.Element[] = Object.keys(commands).map((category, key) => {
      const isActive = (category === activeTab);
      const isDisabled = !commands[category]
      return <p
        key={`category-${key}`}
        className={`${isActive ? "font-bold" : ""} ${isDisabled ? "text-gray-500" : "cursor-pointer"}`}
        onClick={isDisabled ? undefined : () => setActiveTab(category)}>
        {category}
      </p>
    })
    setTabs(elements)
  }, [commands, activeTab])

  useEffect(()=>{
    // @ts-expect-error trust me bro
    const elements: JSX.Element[] = queries[activeTab][commands[activeTab][activeSubTab]]?.map((keyword: string, key: number) => (
      <p key={`keyword-${key}`} className="cursor-pointer">{keyword}</p>))
    setKeywords(elements)
  },[commands, activeTab])

  const incrementSubTab = () => {
    setActiveSubTab((prev)=>prev-1)
  }

  const decrementSubTab = () => {
    setActiveSubTab((prev)=>prev-1)
  }

  return (
    <div className="flex flex-col p-4 gap-2 border-1 border-stone-600">
      <div className="flex gap-2">{tabs}</div>
      <div className="flex justify-around">
        <p className={`${canDecrementSubTab ? "cursor-pointer" : "text-gray-500"}`} onClick={canDecrementSubTab ? ()=>decrementSubTab() : undefined}>{"<"}</p>
        <p>{commands[activeTab][activeSubTab]}</p>
        <p className={`${canIncrementSubTab ? "cursor-pointer" : "text-gray-500"}`} onClick={canIncrementSubTab ? ()=>incrementSubTab() : undefined}>{">"}</p>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        {keywords}
      </div>
    </div>
  )

}

export default Commands;
