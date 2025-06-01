import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex flex-row text-center items-center justify-between h-14 px-4 w-full bg-stone-800 shadow-xl">
      <img src="./svg/pokeball.svg" className="h-12 aspect-square cursor-pointer" onClick={() => navigate("/")} />
      <div className="flex flex-row gap-2 items-center">
        {user.isGuest ?
          <button className="hover:underline cursor-pointer" onClick={() => navigate("/sign-in")}>Sign in</button>
          :
          <button className="hover:underline cursor-pointer" onClick={() => user.logout()}>Sign out</button>
        }
        <button className="text-xl font-bold cursor-pointer" onClick={() => navigate("/about")}>?</button>
      </div>
    </div>
  )
}

export default Navbar;
