
function Navbar() {
  return (
    <div className="flex flex-row text-center items-center justify-between h-14 px-4 w-full bg-stone-800 shadow-xl">
      <img src="./svg/pokeball.svg" className="h-12 aspect-square cursor-pointer"/>
      <div className="flex flex-row gap-2 items-center">
        <p className="hover:underline cursor-pointer">Sign in</p>
        <p className="text-xl font-bold cursor-pointer">?</p>
      </div>
    </div>
  )
}

export default Navbar;
