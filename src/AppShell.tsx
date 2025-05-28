import Navbar from "./components/layout/Navbar"

function AppShell({children}: {children: any}) {

  return (
    <div className="flex flex-col w-full h-screen bg-stone-900 max-w-[100vw]">
      <Navbar />
        <div className="flex flex-col max-w-[1280px] mx-auto w-full flex-1 p-12 items-center">
          {children}
        </div>
    </div>
  )
}

export default AppShell;
