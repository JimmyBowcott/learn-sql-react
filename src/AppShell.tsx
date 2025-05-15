import Navbar from "./components/Navbar"

function AppShell({children}: {children: any}) {

  return (
    <div className="flex flex-col w-full h-full bg-stone-900">
      <Navbar />
        <div className="flex flex-col max-width-[1280] h-full w-full">
          {children}
        </div>
    </div>
  )
}

export default AppShell;
