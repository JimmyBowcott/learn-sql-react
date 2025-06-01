import { useEffect, useState } from "react";
import AppShell from "../AppShell.tsx";
import api from "../api.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

interface IFormProps {
  title: string,
  value: string,
  error: string,
  onChange: (e: any)=>void,
  type?: string
}

function FormField({title, value, onChange, error, type}: IFormProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold">{title.toUpperCase()}</p>
      <input
        type={type??"text"}
        value={value}
        onChange={onChange}
        className={`px-2 p-1 rounded-lg border-1 ${error.length > 0 ? "border-red-600" : "border-gray-400"} w-78`}>
      </input>
      <p className="text-xs text-red-600 h-2">{error.length > 0 ? error : ""}</p>
    </div>
  )
}

function SignInPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useAuth();
  const query = new URLSearchParams(useLocation().search)
  const isSigningUp = Boolean(query.get("new"))
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user.isGuest) navigate("/");
  },[])

  useEffect(()=>{
    setPassword("");
    setUsernameError("");
    setPasswordError("");
  },[isSigningUp])

  const signUp = async () => {
    try {
      await api.post("/signup", { name: username, pass: password })
    } catch (error: any) {
      if (error.response.status === 400) {
        setUsernameError("Username already exists")
      }
    }
  }

  const signIn = async () => {
    try {
      await api.post("/signin", { name: username, pass: password })
    } catch (error: any) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Incorrect username or password")
      } else {
        setErrorMessage("An error has occured. Please try again later.")
      }
    }
  }
  
  const clearErrors = () => {
    setUsernameError("");
    setPasswordError("");
    setErrorMessage("");
  }

  return (<AppShell>
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">{isSigningUp ? "Sign Up" : "Sign In"}</h1>
      <FormField
        title="Username"
        value={username}
        onChange={(e)=>{clearErrors(); setUsername(e.target.value)}}
        error={usernameError} />
      <FormField
        title="Password"
        value={password}
        type="password"
        onChange={(e)=>{clearErrors(); setPassword(e.target.value)}}
        error={passwordError} />
      <div className="flex flex-col gap-1">
        <button
          className="cursor-pointer bg-red-600 w-78 p-1 rounded-lg"
          onClick={()=>{ if (isSigningUp) {signUp()} else {signIn()}}}>
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-xs text-red-600 h-1">{errorMessage}</p>
      </div>
      {isSigningUp ?
        <p>
          Already have an account? <span
            className="underline cursor-pointer"
            onClick={() => navigate("/sign-in")}>
            Sign in here
          </span>
        </p>
        :
        <p>
          Don't have an account? <span
            className="underline cursor-pointer"
            onClick={() => navigate("/sign-in?new=true")}>
            Create one here
          </span>
        </p>
      }
    </div>
  </AppShell>)
}

export default SignInPage;
