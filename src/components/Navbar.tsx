import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row text-center items-center justify-between h-14 px-4 w-full bg-stone-800 shadow-xl">
      <img src="./svg/pokeball.svg" className="h-12 aspect-square cursor-pointer" onClick={()=> navigate("/")}/>
      <div className="flex flex-row gap-2 items-center">
        <p className="hover:underline cursor-pointer" onClick={()=>navigate("/sign-in")}>Sign in</p>
        <p className="text-xl font-bold cursor-pointer" onClick={()=>navigate("/about")}>?</p>
      </div>
    </div>
  )
}

export default Navbar;
