import Navbar from "./components/Navbar"

function AppShell({children}: {children: any}) {

  return (
    <div className="flex flex-col w-full h-full bg-stone-900">
      <Navbar />
        <div className="flex flex-col max-w-[1280px] mx-auto w-full h-full p-12">
          {children}
        </div>
    </div>
  )
}

export default AppShell;
